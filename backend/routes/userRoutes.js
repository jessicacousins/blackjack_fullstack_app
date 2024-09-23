const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route POST /api/users/register
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phone, bio, photoURL } =
    req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user object
    user = new User({
      firstName,
      lastName,
      email,
      password: password ? await bcrypt.hash(password, 10) : null,
      phone,
      bio,
      photoURL,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/users/update
router.post("/update", async (req, res) => {
  const { email, firstName, lastName, phone, bio, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.bio = bio;
    user.photoURL = photoURL;

    // Save the updated user to the database
    await user.save();

    res.json({ user });
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    res.status(500).send("Server error");
  }
});

// Get Top 10 Users by Latest Score
router.get("/top-scores", async (req, res) => {
  try {
    const topUsers = await User.aggregate([
      { $unwind: "$scores" }, // Unwind the scores array
      { $sort: { "scores.value": -1 } }, // Sort by the highest score
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          email: { $first: "$email" },
          latestScore: { $first: "$scores.value" },
        },
      },
      { $sort: { latestScore: -1 } }, // Sort by the latest score
      { $limit: 10 }, // Limit to top 10
    ]);
    res.json(topUsers);
  } catch (err) {
    console.error("Error fetching top scores:", err.message);
    res.status(500).send("Server error");
  }
});

// Update Player Score
router.post("/update-score", async (req, res) => {
  const { email, score, didWin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Increment games played
    user.gamesPlayed += 1;

    if (didWin) {
      user.gamesWon += 1; // Increment games won
      user.currentWinningStreak += 1; // Increment current streak
      if (user.currentWinningStreak > user.longestWinningStreak) {
        user.longestWinningStreak = user.currentWinningStreak; // Update longest streak
      }
    } else {
      user.gamesLost += 1; // Increment games lost
      user.currentWinningStreak = 0; // Reset current streak on loss
    }

    // Check if new score is the highest score
    if (score > user.highestScore) {
      user.highestScore = score;
    }

    // Add the new score with the current date
    user.scores.push({ value: score });

    await user.save();

    res.status(200).json({ msg: "Score updated", user });
  } catch (error) {
    console.error("Error updating score:", error.message);
    res.status(500).send("Server error");
  }
});

// @route GET /api/users/stats/:email
router.get("/stats/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const stats = {
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      gamesLost: user.gamesLost,
      highestScore: user.highestScore,
      longestWinningStreak: user.longestWinningStreak,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
