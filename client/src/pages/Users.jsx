import React, { useState, useEffect  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8800/users')
                setUsers(res.data)
            } catch (err) { 
                console.log(err);
            }
        }

        fetchAllUsers();
}, [])


    return (
        <div>
            <h1>All users</h1>
            {users && users.map(user => (
                <div key={user.id}>
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                </div>
            ))}

            <button><Link to="/add">Add new user</Link></button>
        </div>
    )
};

export default Users;
