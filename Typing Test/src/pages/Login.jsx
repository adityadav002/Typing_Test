/** @format */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Invalid credentials")
      );
    }
  };

  return (
    <>
      <h1 className="Loginh1">Login</h1>
      <div className="navbar">
        <Navbar />
      </div>
      <form onSubmit={handleLogin} className="form-container">
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
          Login
        </button>
      </form>
      <p>{message}</p>
    </>
  );
}

export default Login;
