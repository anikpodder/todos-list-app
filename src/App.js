import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  // Initialize todos from local storage or set to an empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Update local storage whenever `todos` changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Delete a todo
  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
  };

  // Add a new todo
  const addTodo = (title, desc) => {
    const sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    const myTodo = { sno, title, desc };
    setTodos([...todos, myTodo]);
  };

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
