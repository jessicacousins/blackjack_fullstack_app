import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./BlackjackGame.css";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

// Utility function to generate deck
const generateDeck = () => {
  let deck = [];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push({ value, suit });
    });
  });
  return deck;
};

// Utility to calculate hand value
const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;

  hand.forEach((card) => {
    if (card.value === "A") {
      aceCount += 1;
      value += 11;
    } else if (["J", "Q", "K"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  });

  // Handle Aces (11 or 1)
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
};

const BlackjackGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [playerWins, setPlayerWins] = useState(false); // Track if player wins
  const [tie, setTie] = useState(false); // Track if there's a tie

  // Shuffling the deck
  const shuffleDeck = (newDeck) => {
    let shuffledDeck = [...newDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  };

  // Starting a new game
  const dealInitialCards = () => {
    const newDeck = shuffleDeck(generateDeck()); // Generate and shuffle a fresh deck
    setDeck(newDeck); // Set the shuffled deck to the state
    const initialPlayerHand = [newDeck[0], newDeck[2]];
    const initialDealerHand = [newDeck[1], newDeck[3]];
    setPlayerHand(initialPlayerHand); // Deal player cards
    setDealerHand(initialDealerHand); // Deal dealer cards
    setPlayerTotal(calculateHandValue(initialPlayerHand)); // Calculate player hand total
    setDealerTotal(calculateHandValue([newDeck[1]])); // Show only dealer's first card total
    setGameStarted(true); // Set the game to started
    setGameOver(false); // Reset game over state
    setPlayerTurn(true); // Reset player's turn
    setPlayerWins(false); // Reset player win state
    setTie(false); // Reset tie state
  };

  const getCardImage = (card) => {
    return `/images/${card.value}_of_${card.suit}.png`; // Image for each card
  };

  const handleHit = () => {
    const newCard = deck.pop();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);
    const playerValue = calculateHandValue(newPlayerHand);
    setPlayerTotal(playerValue);

    if (playerValue > 21) {
      // Player busts
      setGameOver(true);
      setPlayerTurn(false);
      setPlayerWins(false); // Player loses
    }
  };

  const handleStand = () => {
    setPlayerTurn(false);
    setDealerTotal(calculateHandValue(dealerHand)); // Reveal dealer's full total
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
    setGameStarted(false);
    setPlayerTurn(true);
    setPlayerWins(false);
    setTie(false);
  };

  const checkForWinner = () => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
      // If player busts, dealer wins
      setGameOver(true);
      setPlayerWins(false);
    } else if (dealerValue > 21) {
      // If dealer busts, player wins
      setGameOver(true);
      setPlayerWins(true);
    } else if (playerValue > dealerValue) {
      // Player has a higher value than dealer
      setGameOver(true);
      setPlayerWins(true);
    } else if (dealerValue > playerValue) {
      // Dealer has a higher value than player
      setGameOver(true);
      setPlayerWins(false);
    } else {
      // It's a tie
      setGameOver(true);
      setTie(true);
    }
  };

  // Dealer's logic to hit until hand is at least 17
  useEffect(() => {
    if (!playerTurn && gameStarted) {
      let dealerValue = calculateHandValue(dealerHand);
      const newHand = [...dealerHand];

      while (dealerValue < 17) {
        const newCard = deck.pop();
        newHand.push(newCard);
        dealerValue = calculateHandValue(newHand);
      }

      setDealerHand(newHand);
      setDealerTotal(dealerValue); // Update dealer's total
      checkForWinner();
    }
  }, [playerTurn]);

  return (
    <div className="blackjack-game">
      <h1>Blackjack</h1>
      {playerWins && <Confetti />} {/* Confetti only appears if player wins */}
      {!gameStarted ? (
        <button className="start-button" onClick={dealInitialCards}>
          Start Game
        </button>
      ) : (
        <>
          <div className="hands">
            <div className="player-hand">
              <h2>Your Hand (Total: {playerTotal})</h2>
              <div className="cards">
                {playerHand.map((card, index) => (
                  <div className="card" key={index}>
                    <div className={`card-content ${card.suit}`}>
                      <span className="card-value">{card.value}</span>
                      <span className="card-suit">{card.suit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dealer-hand">
              <h2>
                Dealer's Hand (Total:{" "}
                {playerTurn ? dealerTotal : calculateHandValue(dealerHand)})
              </h2>
              <div className="cards">
                {dealerHand.map((card, index) => (
                  <div className="card" key={index}>
                    <div className={`card-content ${card.suit}`}>
                      {playerTurn && index === 0 ? (
                        <img src="/images/cardBack.png" alt="Card Back" />
                      ) : (
                        <>
                          <span className="card-value">{card.value}</span>
                          <span className="card-suit">{card.suit}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="controls">
            {playerTurn && <button onClick={handleHit}>Hit</button>}
            {playerTurn && <button onClick={handleStand}>Stand</button>}
          </div>
          {gameOver && (
            <>
              <p>
                Game Over!{" "}
                {tie
                  ? "It's a Tie!"
                  : playerWins
                  ? "Player Wins!"
                  : "Dealer Wins!"}
              </p>
              <button className="reset-button" onClick={resetGame}>
                Play Again!
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BlackjackGame;
