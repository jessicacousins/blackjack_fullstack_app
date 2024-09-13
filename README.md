# Vite Blackjack Game

A simple Blackjack game built using React and Vite. The game allows players to play Blackjack against a dealer, implementing the core game mechanics, win/loss detection, and visual feedback using animations like confetti.

## Description

This is a web-based Blackjack game where the player can draw cards, stand, and attempt to beat the dealer by getting a hand value as close to 21 as possible without exceeding it.

## Firebase Authentication Integration

This project includes Firebase authentication, allowing users to sign up, log in, and log out using email/password or Google Authentication. Before playing the game, users must sign in via the authentication page. Once logged in, the game becomes accessible, and a logout button is provided to end the session. Please note, Firebase configuration (firebase.js) is not included in the repository and needs to be set up separately.

## Features

- Shuffle and deal cards randomly at the start of each game.
- Allows the player to **Hit** (draw a card) or **Stand**.
- Dealer automatically draws cards until a total hand value of at least 17.
- Detects and declares a win, loss, or tie.
- Confetti animation when the player wins.
- Play Again button to restart the game.

## Packages Used

-## Packages Used

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/) - A fast frontend build tool and development server.
- [Confetti](https://www.npmjs.com/package/react-confetti) - A React package to create confetti animations.
- [Firebase](https://firebase.google.com/) - A platform for backend services including authentication, database, and hosting.
- [React Router](https://reactrouter.com/) - A standard library for routing in React applications.

## Installation and Running the App

To run the app locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## License Info

[MIT](https://choosealicense.com/licenses/mit/)  
_Copyright (c) 2024 Jessica Cousins_

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
