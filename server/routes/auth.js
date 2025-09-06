const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { generateToken, verifyToken } = require('../utils/jwtHelper.jsx');
const { sendTournamentEmail } = require('../services/emailService.jsx');
const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co', 
  process.env.SUPABASE_KEY || 'placeholder-key'
);

// Validation middleware
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number' 
      });
    }

    // Create Supabase auth user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      return res.status(400).json({ 
        success: false, 
        message: authError.message 
      });
    }

    // Create profile with auth user ID
    const { data: userData, error: insertError } = await supabase
      .from('profile')
      .insert({
        id: authData.user.id,
        name,
        email,
        phone
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ 
        success: false, 
        message: `Failed to create user profile: ${insertError.message}` 
      });
    }
    
    // Generate JWT token
    const token = generateToken({ id: authData.user.id, email });

    // Send welcome email
    await sendTournamentEmail(
      email,
      'Welcome to Spirit Esports!',
      `Hi ${name}, welcome to India's premier BGMI tournament platform!`
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: { id: userData.id, name, email }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password required' 
      });
    }

    // For demo purposes, mock authentication
    const mockUserId = Date.now().toString();
    const mockProfile = { id: mockUserId, name: 'Demo User', email };
    
    // Generate JWT token
    const token = generateToken({ id: mockUserId, email });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: mockProfile
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }

  req.user = decoded;
  next();
};

// Get user profile (protected)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.json({
      success: true,
      user: profile
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;