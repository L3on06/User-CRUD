import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Registe() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is an Admin and if secret key is correct
    if (userType === "Admin" && secretKey !== "leon") {
      alert("Invalid admin");
      return;
    }

    try {
      // Get form data
      console.log(username, email, password);

      // Make an axios post request to register user
      const response = await axios.post("http://localhost:8800/register", {
        username,
        email,
        password,
        userType
      });

      // Check if username, email, and password meet length requirements
      console.log(response.data, "userRegister");
      if (username.length < 4 || email.length < 8 || password.length < 8) {
        setError(true);
      } else {
        // If registration is successful, alert user and redirect to home page
        if (response.data.status === "Created successfully") {
          alert("Registration Successful");
          window.location.href = "./";
        } else {
          // If user already exists, alert user
          alert("User already exists");
        }
      }
    } catch (error) {
      // If there is an error, log error message and alert user
      console.error(error);
      alert("An error occurred while registering. Please try again later.");
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="logo" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div class="mw-100 d-flex justify-content-between gap-col-4">
                <div className="d-block mb-3">
                  <label for="UserType" className="form-label" htmlFor="UserType">Role: &nbsp;</label>
                  <select id="UserType" className="form-control" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                    <option selected disabled>Choose...</option>
                    <option
                      name="UserType"
                      value="User"
                      checked={userType === "User"}>
                      User
                    </option>
                    <option
                      name="UserType"
                      value="Admin"
                      checked={userType === "Admin"}
                    >
                      Admin
                    </option>
                  </select>
                </div>
                {userType === "Admin" ?
                  <div className="d-block mb-3">
                    <label className="form-label">Secret Key: &nbsp;</label>
                    <input
                      className="form-control"
                      type="password"
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </div>
                  : null
                }
              </div>

              <div class="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                  minlength="4"
                  maxlength="10"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                {error && (username.length < 4 || username.length > 10) ?
                  <span class="input-group-text" id="username">Must be 4-10 characters long.</span>
                  : ""
                }
              </div>

              <div class="input-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  minlength="8"
                  maxlength="40"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && (email.length < 8 || email.length > 40) ?
                  <span class="input-group-text" id="email">Must be @ and 8-40 characters long.</span> : ""
                }
              </div>
              <div class="input-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password"
                  minlength="8"
                  maxlength="100"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (password.length < 8 || password.length > 100) ?
                  <span class="input-group-text" id="password">Must be 8-20 characters long.</span>
                  : ""
                }
              </div>
              <div className="float-end">
                <Link to="/">
                  <a href="/" type="button" className="m-2 ">
                    I have account Login
                  </a>
                </Link>
                <button type="submit" className="m-2 btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </section >
  );
}