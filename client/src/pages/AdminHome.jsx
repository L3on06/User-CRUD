import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function AdminHome() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async () => {
        try {
            const response = await axios.get("http://localhost:8800/getAllUser");
            console.log(response.data, "userData");
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./";
    };

    const deleteUser = async (id, username) => {
        if (window.confirm(`Are you sure you want to delete ${username}`)) {
            try {
                const response = await axios.post("http://localhost:8800/deleteUser", {
                    userId: id,
                });
                alert(response.data.data);
                getAllUser();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="container ">
            <h1 className="my-5">Welcome Admin</h1>
            <table className="table table-striped ">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Usertype</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {data.map((i) => {
                    return (
                        <tbody key={i._id}>
                            <tr>
                                <td>{i.username}</td>
                                <td>{i.email}</td>
                                <td>{i.userType}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Link to={`/update/${i._id}`}>
                                            <button className="btn btn-primary">
                                                Update
                                            </button>
                                        </Link>
                                        <br />
                                        <button className="btn btn-danger" onClick={() => deleteUser(i._id, i.username)}>
                                            delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            <button onClick={logOut} className="btn btn-primary">
                Log Out
            </button>
        </div>
    );
}