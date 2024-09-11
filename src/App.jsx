import React, { useState } from "react";
import BlackjackGame from "./components/BlackjackGame";
import "./App.css";

function App() {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules((prevState) => !prevState);
  };

  return (
    <div className="App">
      <button className="toggle-rules-button" onClick={toggleRules}>
        {showRules ? "Hide Rules" : "Show Rules"}{" "}
      </button>

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

      <BlackjackGame />
    </div>
  );
}

export default App;
