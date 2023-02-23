import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Update = () => {
    
    const [user, setUser] = useState({
        username: "",
        email:"",
        password:"",
    });
  

    const [error,setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  console.log(`http://localhost:8800/users/${userId}`)

    const handleClick = async (e) => {
      e.preventDefault();

        try {
          await axios.put(`http://localhost:8800/users/${userId}`, user);
          navigate("/users");
        } catch (err) {
          console.log(err);
          setError(true);
        }
    }



    return (
        <div>
        <h1>Update User</h1>
        {error && "Something went wrong!"}
            <input type="text" placeholder="Username" onChange={handleChange} name="username" />
            <input type="email" placeholder="Email" onChange={handleChange} name="email" />
            <input type="password" placeholder="Password" onChange={handleChange} name="password" />
            <button onClick={handleClick}>Update</button>
        </div>
          
        )
};

export default Update;
