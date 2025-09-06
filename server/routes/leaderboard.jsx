const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co', 
  process.env.SUPABASE_KEY || 'placeholder-key'
);

// Leaderboard API
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("player, score")
      .order("score", { ascending: false });

    if (error) throw error;

    res.json({ success: true, leaderboard: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
