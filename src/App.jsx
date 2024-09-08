import React from "react";
import BlackjackGame from "./components/BlackjackGame";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BlackjackGame />
      <div className="rules">
        <h2>Blackjack Rules</h2>
        <p>
          The goal of Blackjack is to beat the dealer's hand without going over
          21.
        </p>
        <ul>
          <li>
            Each player starts with two cards, one of the dealer's cards is
            hidden until the end.
          </li>
          <li>
            To 'Hit' is to ask for another card. To 'Stand' is to hold your
            total and end your turn.
          </li>
          <li>
            If you go over 21, you bust, and the dealer wins regardless of the
            dealer's hand.
          </li>
          <li>
            If you are dealt 21 from the start (Ace & 10), you got a Blackjack.
          </li>
          <li>Dealer will hit until their cards total 17 or higher.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
