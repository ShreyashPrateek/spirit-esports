import React, { useState } from 'react';
import { Users, User, Phone, X } from 'lucide-react';
import { supabase } from '../../../supabaseClient';
import toast from "react-hot-toast";

const RegistrationModal = ({ tournament, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    player1Name: '',
    player2Name: '',
    player3Name: '',
    player4Name: '',
    whatsappNumber: '',
    player5Name: '',
    player6Name: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      teamName: '',
      player1Name: '',
      player2Name: '',
      player3Name: '',
      player4Name: '',
      whatsappNumber: '',
      player5Name: '',
      player6Name: ''
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.player1Name.trim()) newErrors.player1Name = 'Player 1 name is required';
    if (!formData.player2Name.trim()) newErrors.player2Name = 'Player 2 name is required';
    if (!formData.player3Name.trim()) newErrors.player3Name = 'Player 3 name is required';
    if (!formData.player4Name.trim()) newErrors.player4Name = 'Player 4 name is required';
    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (!/^\d{10}$/.test(formData.whatsappNumber.replace(/\D/g, ''))) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const registrationData = {
        tournament_id: tournament.id,
        team_name: formData.teamName.trim(),
        player1_name: formData.player1Name.trim(),
        player2_name: formData.player2Name.trim(),
        player3_name: formData.player3Name.trim(),
        player4_name: formData.player4Name.trim(),
        whatsapp_number: formData.whatsappNumber.replace(/\D/g, ''),
        player5_name: formData.player5Name.trim() || null,
        player6_name: formData.player6Name.trim() || null,
        registration_date: new Date().toISOString(),
        status: 'registered'
      };

      const { error } = await supabase
        .from('custom_tournament_registrations')
        .insert([registrationData]);

      if (error) {
        if (error.message.includes("Tournament is full")) {
          toast.error("⚠️ Tournament is already full!");
        } else if (error.message.includes("unique_team_per_tournament")) {
          toast.error("⚠️ This team is already registered for the tournament.");
        } else if (error.message.includes("unique_whatsapp_per_tournament")) {
          toast.error("⚠️ This WhatsApp number is already registered for the tournament.");
        } else {
          toast.error("❌ Registration failed: " + error.message);
        }
        return;
      }

      toast.success('Registration successful!');
      resetForm();
      onClose();
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || !tournament) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-xl border border-purple-500/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Tournament Registration</h2>
            <p className="text-purple-100">{tournament.name}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Team Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Users className="w-4 h-4 mr-2" />
                Team Name *
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => handleInputChange('teamName', e.target.value)}
                className={`w-full bg-gray-800/50 border ${errors.teamName ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                placeholder="Enter your team name"
              />
              {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName}</p>}
            </div>

            {/* Player Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(num => (
                <div key={num}>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Player {num} Name *
                  </label>
                  <input
                    type="text"
                    value={formData[`player${num}Name`]}
                    onChange={(e) => handleInputChange(`player${num}Name`, e.target.value)}
                    className={`w-full bg-gray-800/50 border ${errors[`player${num}Name`] ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                    placeholder={`Enter Player ${num} name`}
                  />
                  {errors[`player${num}Name`] && <p className="text-red-400 text-sm mt-1">{errors[`player${num}Name`]}</p>}
                </div>
              ))}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Number *
              </label>
              <input
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                className={`w-full bg-gray-800/50 border ${errors.whatsappNumber ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                placeholder="Enter your WhatsApp number"
              />
              {errors.whatsappNumber && <p className="text-red-400 text-sm mt-1">{errors.whatsappNumber}</p>}
            </div>

            {/* Optional Players */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Substitute Players (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[5, 6].map(num => (
                  <div key={num}>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      Player {num} Name
                    </label>
                    <input
                      type="text"
                      value={formData[`player${num}Name`]}
                      onChange={(e) => handleInputChange(`player${num}Name`, e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder={`Enter Player ${num} name (optional)`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Info */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-lg p-4 border border-gray-700">
              <h4 className="text-white font-medium mb-2">Tournament Details</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Entry Fee: ₹{tournament.entryFee?.toLocaleString() || '0'}</p>
                <p>Prize Pool: ₹{tournament.prize_pool?.toLocaleString() || '0'}</p>
                <p>Tournament Type: {tournament.type.toUpperCase()}</p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Registering...' : 'Register Team'}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700 hover:border-purple-500/50 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;