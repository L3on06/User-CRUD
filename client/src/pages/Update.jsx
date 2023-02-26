import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const response = await axios.put(`http://localhost:8800/update/${id}`, data);

            // Check if username, email, and password meet length requirements
            if (data.username.length < 4 || data.email.length < 8 || data.password.length < 8) {
                setError(true);
            } else {
                console.log(response.data);
                window.localStorage.setItem("token", response.data);
                navigate("/users");
                // handle success
            }
        } catch (error) {
            console.error(error);
            // handle error
            alert("An error occurred while updating. Please try again later.");
        }
    };

    return (
        <div className="vh-100 bg-info d-flex justify-content-center align-items-center">
            <div class="container bg-white card-body m-5 rounded w-50 shadow p-5">
                <div class="row">
                    <div class="col-md-6 mx-auto p-2">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label><b>Username:</b></label>
                                <input
                                    className="form-control my-3"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    minlength="4"
                                    maxlength="10"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    required
                                />
                                {error && (user.username.length < 4 || user.username.length > 10) ?
                                    <span class="input-group-text" id="username">Must be 4-10 characters long.</span>
                                    : ""
                                }
                            </div>
                            <div class="form-group">
                                <label><b>Email:</b></label>
                                <input
                                    className="form-control my-3"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    minlength="8"
                                    maxlength="40"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    required
                                />
                                {error && (user.email.length < 8 || user.email.length > 40) ?
                                    <span class="input-group-text" id="email">Must be @ and 8-40 characters long.</span> : ""
                                }
                            </div>
                            <div class="form-group">
                                <label><b>Password:</b></label>
                                <input
                                    className="form-control my-3"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    minlength="8"
                                    maxlength="100"
                                    onChange={(e) => setUser({ user, password: e.target.value })}
                                    required
                                />
                                {error && (user.password.length < 8 || user.password.length > 100) ?
                                    <span class="input-group-text" id="password">Must be 8-20 characters long.</span>
                                    : ""
                                }
                            </div>
                            <div className="d-flex gap-2">
                                <Link to='/users'>
                                    <a href="/users" className="btn btn-primary">
                                        Go back
                                    </a>
                                </Link>
                                <br />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
