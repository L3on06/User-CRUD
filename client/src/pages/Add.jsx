import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Add = () => {
    
    const [users, setUsers] = useState({
        username: "",
        email:"",
        passsword:"",
    });

    const navigate = useNavigate()


    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/users", users)
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => { 
        setUsers(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div>
            <h1>Add new User</h1>
            <input type="text" placeholder="Username" onChange={handleChange} name="username" />
            <input type="email" placeholder="Email" onChange={handleChange}  name="email"/>
            <input type="password" placeholder="Password" onChange={handleChange} name="password" />
        <button onClick={handleClick}>Add</button>
        </div>
        )
};

export default Add;
