import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit, Camera } from 'lucide-react';
import Header from '../../Header';
import { useAuth } from '../../../hooks/useAuth';
import EditUserProfile from '../EditUserProfile';

const UserProfile = () => {
  const { user, userProfile } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (userProfile) {
      setCurrentProfile(userProfile);
    }
  }, [userProfile]);

  const handleSave = (updatedProfile) => {
    setCurrentProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!user || !currentProfile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />

        <section className="pt-24 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 p-8">
              
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                    {currentProfile.profile_picture ? (
                      <img 
                        src={currentProfile.profile_picture} 
                        alt={currentProfile.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16" />
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {currentProfile.name}
                  </span>
                </h1>
                <p className="text-gray-400">BGMI Player</p>
              </div>

              {/* Profile Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold">Email</h3>
                    </div>
                    <p className="text-gray-300">{currentProfile.email}</p>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <Phone className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold">Phone</h3>
                    </div>
                    <p className="text-gray-300">+91 {currentProfile.phone}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {isEditing ? (
                    <EditUserProfile
                      user={user}
                      currentProfile={currentProfile}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <>
                  <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <User className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold">Name</h3>
                    </div>
                      <p className="text-gray-300">{currentProfile.name}</p>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Account Status</h3>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Member since {new Date(currentProfile.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-5 h-5" />
                     <span>Edit Profile</span>
                  </button>
                  </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;