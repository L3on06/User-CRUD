import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Add = () => {
    
    const [user, setUser] = useState({
        username: "",
        email:"",
        password:"",
    });

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/users", user)
            navigate("/users");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

  
    return (
        <div>
            <h1>Add new User</h1>
            {error && "Something went wrong!"}
            <input type="text" placeholder="Username" onChange={handleChange} name="username" />
            <input type="email" placeholder="Email" onChange={handleChange}  name="email"/>
            <input type="password" placeholder="Password" onChange={handleChange} name="password" />
        <button onClick={handleClick}>Add</button>
        </div>
        )
};

export default Add;
