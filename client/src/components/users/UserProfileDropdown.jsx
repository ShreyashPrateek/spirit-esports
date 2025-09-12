import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut, ChevronDown, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UserProfileDropdown = () => {
  const { user, userProfile, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false);
    window.location.href = '/';
  };

  if (!user) return null;

  const displayName = userProfile?.name || user.email.split('@')[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg hover:from-purple-500/30 hover:to-blue-500/30 transition-all"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <span className="text-white font-medium">{displayName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-purple-500/20 rounded-lg py-2 shadow-xl z-50">
          <Link
            to="/profile"
            onClick={() => setIsDropdownOpen(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 text-purple-400 hover:bg-purple-400/10 transition-colors"
          >
            <UserCircle className="w-4 h-4" />
            <span>View Profile</span>
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;