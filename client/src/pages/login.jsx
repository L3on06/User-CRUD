import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to log in the user
      const response = await axios.post("http://localhost:8800/login", {
        email,
        password
      });

      // Check the response from the server to see if the login was successful
      if (email.length < 8 || password.length < 8) {
        setError(true);
      } else {
        if (response.data.status === "ok") {
          window.localStorage.setItem("token", response.data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./users"
        } else {
          alert("login failed");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the login process
    }
  }


  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">

            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 mx-auto">
              <div className="input-group mb-3">
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
                  <span className="input-group-text" id="basic-addon2">Must be @ and 8-40 characters long.</span> : ""
                }
              </div >
              <div className="input-group mb-3" >
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
                  <span className="input-group-text" id="basic-addon2" > Must be 8 - 20 characters long.</span >
                  : ""
                }
              </div >
              <div className="float-end" >
                <Link to="/register">
                  <a href="/register" type="button" className="m-2 ">
                    I don't have account
                  </a>
                </Link >
                <button type="submit" className="m-2 btn btn-primary">Login</button >
              </div >
            </div>
          </form >
        </div >
      </div >
    </section>

  )
}

export default Login;