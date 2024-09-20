import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Scoreboard.css";

const Scoreboard = () => {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/top-scores"
        );
        setTopPlayers(response.data);
      } catch (error) {
        console.error("Error fetching top scores:", error);
      }
    };

    fetchTopScores();
  }, []);

  return (
    <div className="scoreboard">
      <h3>Top 10 Players</h3>
      <ul>
        {topPlayers.map((player, index) => (
          <li key={index}>
            {player.firstName} {player.lastName}: {player.latestScore} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
