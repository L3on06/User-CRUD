import React from "react";
import { Link } from "react-router-dom";

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };


  return (
    <div className="vh-100 bg-info d-flex justify-content-center align-items-center">
      <div class="container d-flex justify-content-center ">
        <div class="card p-3 ">
          <div class="d-flex align-items-center">
            <div class="image p-4">
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="150" alt="profile" />
            </div>
            <div className="card card-body border border-0">
              <span>Name:</span>
              <h3>{userData.username}</h3>
              <span>Email:</span>
              <h3>{userData.email}</h3>
              <br />
              <div className="d-flex gap-2">
                <Link to={`/update/${userData._id}`}>
                  <button className="btn btn-primary">
                    Update
                  </button>
                </Link>
                <br />
                <button onClick={logOut} className="btn btn-primary">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
