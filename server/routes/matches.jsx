const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co', 
  process.env.SUPABASE_KEY || 'placeholder-key'
);

// Match history API
router.get("/:player", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("player", req.params.player);

    if (error) throw error;

    res.json({ success: true, matches: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
