import React, { useState, useEffect } from 'react';
import { User, Phone, Save, X } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const EditUserProfile = ({ user, currentProfile, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editData, setEditData] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    if (currentProfile) {
      setEditData({
        name: currentProfile.name || '',
        phone: currentProfile.phone || ''
      });
    }
  }, [currentProfile]);

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
      const { data, error: upsertError } = await supabase
        .from('profile')
        .upsert({
          id: user.id,
          name: editData.name.trim(),
          phone: editData.phone,
          email: user.email
        })
        .select();

      if (upsertError) {
        throw upsertError;
      }

      onSave({
        ...currentProfile,
        name: editData.name.trim(),
        phone: editData.phone
      });
      alert('Profile updated successfully!');
    } catch (error) {
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
    setError('');
    onCancel();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
        <div className="flex items-center space-x-3 mb-4">
          <Phone className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Phone</h3>
        </div>
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
      </div>

      <div className="bg-gray-800/30 rounded-lg p-6 border border-purple-500/10">
        <div className="flex items-center space-x-3 mb-4">
          <User className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Name</h3>
        </div>
        <input
          type="text"
          name="name"
          value={editData.name}
          onChange={handleInputChange}
          className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="Enter your name"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Action Buttons */}
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
    </div>
  );
};

export default EditUserProfile;