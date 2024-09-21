import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import BlackjackGame from "./components/BlackjackGame";
import SignUp from "./components/SignUp";
import Scoreboard from "./components/Scoreboard";
import "./App.css";
import "./NavBar.css";

function App() {
  const [showRules, setShowRules] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleRules = () => {
    setShowRules((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-logo">Blackjack Game</div>
        <div className="navbar-links">
          <button className="toggle-rules-button" onClick={toggleRules}>
            {showRules ? "Hide Rules" : "Show Rules"}
          </button>
          {user ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </nav>

      {showRules && (
        <div className="rules">
          <h2>Blackjack Rules</h2>
          <p>
            The goal of Blackjack is to beat the dealer's hand without going
            over 21.
          </p>
          <ul>
            <li>
              <span className="emoji">♠️</span> Each player starts with two
              cards, one of the dealer's cards is hidden until the end.
            </li>
            <li>
              <span className="emoji">♥️</span> To 'Hit' is to ask for another
              card. To 'Stand' is to hold your total and end your turn.
            </li>
            <li>
              <span className="emoji">♦️</span> If you go over 21, you bust, and
              the dealer wins regardless of the dealer's hand.
            </li>
            <li>
              <span className="emoji">♣️</span> If you are dealt 21 from the
              start (Ace & 10), you got a Blackjack!
            </li>
            <li>
              <span className="emoji">♠️</span> Dealer will hit until their
              cards total 17 or higher.
            </li>
          </ul>
        </div>
      )}

      {user ? (
        <>
          <div className="main-content">
            <Scoreboard />
            <BlackjackGame user={user} />
          </div>
        </>
      ) : (
        <SignUp />
      )}
    </div>
  );
}

export default App;
