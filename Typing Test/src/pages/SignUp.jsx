/** @format */

import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("Signup successful!");
        navigate("/");
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="Signuph1">Sign Up</h1>
      <div className="navbar">
        <Navbar />
      </div>
      <form onSubmit={handleRegister} className="form-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </>
  );
}

export default SignUp;
