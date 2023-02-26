import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Update from './pages/Update';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn === 'true' ? <Users /> : <Login />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
      </Routes>
    </div>
  );
}

export default App;
