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
import UserProfilePage from './components/UserProfilePage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

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
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
      {/* Toast Container - Custom styled for your dark gaming theme */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            background: '#1f2937', // gray-800
            color: '#f9fafb', // gray-50
            border: '1px solid #374151', // gray-700
            borderRadius: '0.5rem',
            fontSize: '14px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          // Custom styles for different types
          success: {
            style: {
              border: '1px solid #10b981', // emerald-500
              background: '#064e3b', // emerald-900
            },
            iconTheme: {
              primary: '#10b981', // emerald-500
              secondary: '#064e3b', // emerald-900
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444', // red-500
              background: '#7f1d1d', // red-900
            },
            iconTheme: {
              primary: '#ef4444', // red-500
              secondary: '#7f1d1d', // red-900
            },
          },
          loading: {
            style: {
              border: '1px solid #8b5cf6', // purple-500
              background: '#581c87', // purple-900
            },
            iconTheme: {
              primary: '#8b5cf6', // purple-500
              secondary: '#581c87', // purple-900
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;