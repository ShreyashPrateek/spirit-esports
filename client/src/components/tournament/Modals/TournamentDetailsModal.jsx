import React from 'react';
import { Calendar, Trophy, Users, Target, Info, Award, X } from 'lucide-react';

const TournamentDetailsModal = ({ tournament, isOpen, onClose, onRegisterClick, onLeaderboardClick }) => {
  if (!isOpen || !tournament) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'from-green-500 to-emerald-500';
      case 'ongoing': return 'from-blue-500 to-cyan-500';
      case 'completed': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'REGISTRATION OPEN';
      case 'ongoing': return 'IN PROGRESS';
      case 'completed': return 'COMPLETED';
      default: return 'UNKNOWN';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'squad': return 'from-red-500 to-pink-500';
      case 'duo': return 'from-blue-500 to-indigo-500';
      case 'solo': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-xl border border-purple-500/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={tournament.image_url} 
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Status and Type Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className={`bg-gradient-to-r ${getStatusColor(tournament.status)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                {getStatusText(tournament.status)}
              </div>
              <div className={`bg-gradient-to-r ${getTypeColor(tournament.type)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                {tournament.type}
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-16">
              <h2 className="text-3xl font-bold text-white">{tournament.name}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center text-purple-400 mb-2">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Prize Pool</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  ₹{tournament.prize_pool?.toLocaleString() || '0'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center text-green-400 mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">
                    {tournament.type === 'solo' ? 'Players' : 'Teams'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {tournament.participants?.current || 0}/{tournament.participants?.max || 0}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center text-blue-400 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Start Date</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {formatDate(tournament.start_date)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 rounded-lg p-4 border border-orange-500/20">
                <div className="flex items-center text-orange-400 mb-2">
                  <Target className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Entry Fee</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  ₹{tournament.entryFee?.toLocaleString() || '0'}
                </div>
              </div>
            </div>

            {/* Tournament Details */}
            <div className="mb-8">
              <div className="flex items-center text-white mb-4">
                <Info className="w-5 h-5 mr-2" />
                <h3 className="text-xl font-bold">Tournament Details</h3>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-lg p-6 border border-gray-700">
                {tournament.details ? (
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {tournament.details}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">
                    No detailed description available for this tournament.
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-3">Tournament Info</h4>
                <div className="space-y-3">
                  {tournament.stage && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">Current Stage:</span>
                      <span className="text-white font-medium">{tournament.stage}</span>
                    </div>
                  )}
                  
                  {tournament.time && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white font-medium">{tournament.time}</span>
                    </div>
                  )}
                  
                  {tournament.end_date && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span className="text-gray-400">End Date:</span>
                      <span className="text-white font-medium">
                        {formatDate(tournament.end_date)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">Results</h4>
                <div className="space-y-3">
                  {tournament.winner ? (
                    <div className="flex items-center py-2">
                      <Award className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-gray-400 mr-2">Winner:</span>
                      <span className="text-yellow-400 font-bold">{tournament.winner}</span>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">
                      {tournament.status === 'completed' ? 'Results not yet available' : 'Tournament in progress'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {tournament.status === 'upcoming' && (
                <button 
                  onClick={() => onRegisterClick(tournament)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium">
                  Register Now
                </button>
              )}
              
              {tournament.status === 'ongoing' && (
                <button 
                  onClick={() => onLeaderboardClick(tournament)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium">
                  View Leaderboard
                </button>
              )}
              
              {tournament.status === 'completed' && (
                <button 
                  onClick={() => onLeaderboardClick(tournament)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium">
                  View Final Results
                </button>
              )}
              
              <button 
                onClick={onClose}
                className="flex-1 bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700 hover:border-purple-500/50 text-white py-3 px-6 rounded-lg transition-all duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailsModal;