const express = require("express");
const cors = require("cors");
require('dotenv').config();
const authRoutes = require("./routes/auth");
const leaderboardRoutes = require("./routes/leaderboard.jsx");
const matchRoutes = require("./routes/matches.jsx");

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://spiritesports.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/matches", matchRoutes);

app.get("/", (req, res) => {
  res.send("Spirit Esports Backend Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
