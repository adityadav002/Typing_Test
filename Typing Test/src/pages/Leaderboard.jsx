/** @format */

import { useState, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import Navbar from "../components/Navbar";
function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (name) => {
    axios.delete(`http://localhost:3000/api/delete/${name}`);
    setData(data.filter((item) => item.name !== name));
  };

  return (
    <div className="leaderBoard">
      <h2 className="leaderBoard-title">Leaderboard</h2>
      <div className="navbar">
        <Navbar />
      </div>
      <table className="leaderBoard-table">
        <thead>
          <tr>
            <th className="leaderBoard-header">Name</th>
            <th className="leaderBoard-header">WPM</th>
            <th className="leaderBoard-header">Accuracy</th>
            <th className="leaderBoard-header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((data, index) => (
              <tr key={index} className="leaderBoard-row">
                <td className="leaderBoard-data">{data.name}</td>
                <td className="leaderBoard-data">{data.wpm}</td>
                <td className="leaderBoard-data">{data.accuracy}%</td>
                <td className="leaderBoard-data">
                  <RiDeleteBinLine
                    onClick={() => {
                      handleDelete(data.name);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="leaderBoard-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
