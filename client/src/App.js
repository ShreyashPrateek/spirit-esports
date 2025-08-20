import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ContactPage from './components/ContactPage';
import AboutUs from './components/AboutUs';
import TournamentPage from './components/TournamentPage';
import ProGaming from './components/ProGaming';
import FairPlay from './components/FairPlay';
import CustomTournament from './components/CustomTournament';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ProGaming" element={<ProGaming />} />
        <Route path="/FairPlay" element={<FairPlay />} />
        <Route path="/CustomTournament" element={<CustomTournament />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;