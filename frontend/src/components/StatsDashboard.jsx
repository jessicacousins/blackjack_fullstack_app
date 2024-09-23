import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StatsDashboard.css";

const StatsDashboard = ({ user }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/stats/${user.email}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  if (!stats) {
    return <div>Loading statistics...</div>;
  }

  return (
    <div className="stats-dashboard">
      <h2>Player Statistics</h2>
      <div className="stats">
        <p>Games Played: {stats.gamesPlayed}</p>
        <p>Games Won: {stats.gamesWon}</p>
        <p>Games Lost: {stats.gamesLost}</p>
        <p>Win/Loss Ratio: {(stats.gamesWon / stats.gamesPlayed).toFixed(2)}</p>
        <p>Highest Hand Delt: {stats.highestScore}</p>
        <p>Longest Winning Streak: {stats.longestWinningStreak}</p>
      </div>
    </div>
  );
};

export default StatsDashboard;
