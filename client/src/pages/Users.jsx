import React, { useEffect, useState } from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import axios from 'axios';

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:8800/user', {
      token: window.localStorage.getItem('token')
    })
      .then((response) => {
        if (response.data.data.userType === 'Admin') {
          setAdmin(true);
        }
        setUserData(response.data.data);

        if (response.data.data === 'token expired') {
          alert('Token expired login again');
          window.localStorage.clear();
          window.location.href = './';
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return admin ? <AdminHome userData={userData} /> : <UserHome userData={userData} />;
}