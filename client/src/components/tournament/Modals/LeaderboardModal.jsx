import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Users, Target, Zap, RefreshCw, Crown, Medal, X } from 'lucide-react';
import { supabase } from '../../../supabaseClient';
import toast from "react-hot-toast";

const LeaderboardModal = ({ tournament, isOpen, onClose }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboardData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tournament_leaderboard')
        .select('*')
        .eq('tournament_id', tournament.id)
        .order('rank', { ascending: true });

      if (error) {
        console.error('Error fetching leaderboard:', error);
        toast.error('Failed to load leaderboard data');
      } else {
        setLeaderboardData(data || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error('Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  }, [tournament]);

  useEffect(() => {
    if (isOpen && tournament) {
      fetchLeaderboardData();
    }
  }, [isOpen, tournament, fetchLeaderboardData]);

  const getRankIcon = (rank) => {
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-white">{rank}</span>;
  };

  const getRankBgColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'from-gray-800/30 to-gray-900/30 border-gray-700/30';
    }
  };

  if (!isOpen || !tournament) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-xl border border-purple-500/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Leaderboard</h2>
              <p className="text-purple-100">{tournament.name}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {/* Tournament Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
              <div className="flex items-center text-purple-400 mb-2">
                <Trophy className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Prize Pool</span>
              </div>
              <div className="text-xl font-bold text-white">
                ₹{tournament.prize_pool?.toLocaleString() || '0'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center text-green-400 mb-2">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Teams</span>
              </div>
              <div className="text-xl font-bold text-white">
                {leaderboardData.length}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center text-blue-400 mb-2">
                <Target className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Total Eliminations</span>
              </div>
              <div className="text-xl font-bold text-white">
                {leaderboardData.reduce((sum, team) => sum + team.eliminations, 0)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 rounded-lg p-4 border border-orange-500/20">
              <div className="flex items-center text-orange-400 mb-2">
                <Zap className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <div className="text-lg font-bold text-white">
                LIVE
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Team Rankings</h3>
            <button
              onClick={fetchLeaderboardData}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200 text-sm font-medium disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-black/50 border-b border-gray-700 text-sm font-medium text-gray-400">
                    <div>Rank</div>
                    <div>Team</div>
                    <div className="text-center">Matches</div>
                    <div className="text-center">Position Points</div>
                    <div className="text-center">Eliminations</div>
                    <div className="text-center">Total Points</div>
                  </div>

                  {leaderboardData.map((team, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-6 gap-4 p-4 border-b border-gray-700/50 hover:bg-gradient-to-r ${getRankBgColor(team.rank)} transition-all duration-200`}
                    >
                      <div className="flex items-center">
                        {getRankIcon(team.rank)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{team.team_name}</div>
                      </div>
                      <div className="text-center text-white font-medium">{team.matches_played}</div>
                      <div className="text-center text-white font-medium">{team.placement_points}</div>
                      <div className="text-center text-white font-medium">{team.eliminations}</div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{team.total_points}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {leaderboardData.map((team, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${getRankBgColor(team.rank)} rounded-lg border p-4`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getRankIcon(team.rank)}
                        <div>
                          <div className="font-medium text-white">{team.team_name}</div>
                          <div className="text-sm text-gray-400">Rank #{team.rank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-purple-400">{team.total_points}</div>
                        <div className="text-xs text-gray-400">Total Points</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-medium text-white">{team.matches_played}</div>
                        <div className="text-xs text-gray-400">Matches</div>
                      </div>
                      <div>
                        <div className="text-lg font-medium text-white">{team.placement_points}</div>
                        <div className="text-xs text-gray-400">Position Points</div>
                      </div>
                      <div>
                        <div className="text-lg font-medium text-white">{team.eliminations}</div>
                        <div className="text-xs text-gray-400">Eliminations</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Prize Distribution */}
          <div className="mt-8 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-lg border border-gray-700 p-6">
            <h4 className="text-lg font-bold text-white mb-4">Prize Distribution</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20">
                <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">1st Place</div>
                <div className="text-yellow-400 font-medium">₹{Math.floor((tournament.prize_pool || 0) * 0.5).toLocaleString()}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20">
                <Medal className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">2nd Place</div>
                <div className="text-yellow-400 font-medium">₹{Math.floor((tournament.prize_pool || 0) * 0.3).toLocaleString()}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">3rd Place</div>
                <div className="text-yellow-400 font-medium">₹{Math.floor((tournament.prize_pool || 0) * 0.2).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;