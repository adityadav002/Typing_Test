/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", null, {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      setLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">Test</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/about">About</Link>

      {loggedIn ? (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="logout">
            Login
          </Link>
          <Link to="/signup" className="signup">
            Sign up
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
