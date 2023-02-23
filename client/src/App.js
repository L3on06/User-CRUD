import './App.css';
import React, { useState, useEffect  } from "react";
import axios from "axios";
import { Routes, Route} from "react-router-dom";
import Users from "./pages/Users";
import Add from './pages/Add';
import Update from './pages/Update';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {


  return (
    <div className="App">
    <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/update/:id" element={<Update/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
