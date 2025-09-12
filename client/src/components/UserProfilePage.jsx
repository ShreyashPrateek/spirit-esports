import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit, Camera, Save, X } from 'lucide-react';
import Header from './Header';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../supabaseClient';

const UserProfilePage = () => {
  const { user, userProfile } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (userProfile) {
      setCurrentProfile(userProfile);
      setEditData({
        name: userProfile.name || '',
        phone: userProfile.phone || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setEditData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    // Validate phone number
    if (editData.phone && (editData.phone.length !== 10 || !editData.phone.match(/^[6-9][0-9]{9}$/))) {
      setError('Please enter a valid 10-digit Indian phone number starting with 6-9');
      setLoading(false);
      return;
    }

    // Validate name
    if (!editData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    try {
      console.log('Updating profile for user ID:', user.id);
      console.log('Update data:', { name: editData.name.trim(), phone: editData.phone });
      
      const { data, error: upsertError } = await supabase
        .from('profile')
        .upsert({
          id: user.id,
          name: editData.name.trim(),
          phone: editData.phone,
          email: user.email
        })
        .select();

      console.log('Upsert result:', { data, error: upsertError });

      if (upsertError) {
        console.error('Upsert error:', upsertError);
        throw upsertError;
      }

      // Update local state with new data
      setCurrentProfile({
        ...currentProfile,
        name: editData.name.trim(),
        phone: editData.phone
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Save error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: currentProfile?.name || '',
      phone: currentProfile?.phone || ''
    });
    setIsEditing(false);
    setError('');
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
                    {isEditing ? (
                      <div className="flex items-center w-full rounded-lg border border-gray-600 bg-gray-800/50 transition-all focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
                        <span className="pl-3 pr-2 text-gray-400 border-r border-gray-600">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleInputChange}
                          className="flex-1 bg-transparent text-white pl-3 pr-4 py-2 border-0 focus:ring-0"
                          placeholder="Enter 10-digit number"
                          pattern="[6-9][0-9]{9}"
                          maxLength="10"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-300">+91 {currentProfile.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <User className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold">Name</h3>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-gray-300">{currentProfile.name}</p>
                    )}
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

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {isEditing ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <Save className="w-5 h-5" />
                        <span>{loading ? 'Saving...' : 'Save'}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <X className="w-5 h-5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </button>
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

export default UserProfilePage;