import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Trophy, Clock, Target, Filter, ChevronLeft, ChevronRight, Play, GamepadIcon, ArrowRight } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import TournamentDetailsModal from './TournamentDetailsModal';
import RegistrationModal from './RegistrationModal';
import LeaderboardModal from './LeaderboardModal';
import { supabase } from '../../supabaseClient';
import toast from "react-hot-toast";



const TournamentPage = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    sort: 'date'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const tournamentsPerPage = 6;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const fetchTournaments = async () => {
      console.log('Fetching tournaments from Supabase...');
      try {
        const { data, error } = await supabase
          .from('custom_tournaments')
          .select('*');

        console.log('Supabase response:', { data, error });
        
        if (error) {
          console.error('Error fetching tournaments:', error);
          toast.error(`Database Error: ${error.message}`);
        } else {
          console.log('Tournaments fetched:', data);
          console.log('Number of tournaments:', data?.length || 0);
          setTournaments(data || []);
        }
      } catch (err) {
        console.error('Network error:', err);
        toast.error('Failed to connect to database. Please check your connection.');
      }
    };

    fetchTournaments();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter tournaments based on selected filters
  const filteredTournaments = useMemo(() => {
    let filtered = tournaments;

    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Sort tournaments
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'prize':
          return (b.prize_pool || 0) - (a.prize_pool || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date-oldest':
          return new Date(a.start_date) - new Date(b.start_date);
        case 'date':
        default:
          return new Date(b.start_date) - new Date(a.start_date);
      }
    });

    return filtered;
  }, [filters, tournaments]);

  // Pagination
  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage);
  const paginatedTournaments = filteredTournaments.slice(
    (currentPage - 1) * tournamentsPerPage,
    currentPage * tournamentsPerPage
  );

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

  const formatDate = (dateString, endDate = null) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    if (endDate) {
      const end = new Date(endDate);
      const endFormatted = end.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      return `${formatted} - ${endFormatted}`;
    }
    
    return formatted;
  };

  const handleViewDetails = (tournament) => {
    setSelectedTournament(tournament);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTournament(null);
  };

const handleRegisterClick = async (tournament) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
      toast.error('Please login to register for tournaments');
    return;
  }

  // user logged in → open registration modal
  setSelectedTournament(tournament);
  setShowRegistrationModal(true);
};

  const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false);
    setSelectedTournament(null);
  };

  const handleLeaderboardClick = (tournament) => {
    setSelectedTournament(tournament);
    setShowLeaderboardModal(true);
  };

  const handleCloseLeaderboardModal = () => {
    setShowLeaderboardModal(false);
    setSelectedTournament(null);
  };

  // Calculate total prize pool
  const totalPrizePool = tournaments.reduce((sum, tournament) => sum + (tournament.prize_pool || 0), 0);
  const formatPrizePool = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  const stats = [
    { number: tournaments.filter(t => t.status === 'upcoming').length, label: "Upcoming", icon: <Clock className="w-6 h-6" /> },
    { number: tournaments.filter(t => t.status === 'ongoing').length, label: "Live Now", icon: <Play className="w-6 h-6" /> },
    { number: tournaments.filter(t => t.status === 'completed').length, label: "Completed", icon: <Trophy className="w-6 h-6" /> },
    { number: formatPrizePool(totalPrizePool), label: "Total Prizes", icon: <Target className="w-6 h-6" /> }
  ];

  const TournamentCard = ({ tournament }) => (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" 
          src={tournament.image_url} 
          alt={tournament.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className={`absolute top-3 right-3 bg-gradient-to-r ${getTypeColor(tournament.type)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
          {tournament.type}
        </div>
        <div className={`absolute bottom-3 left-3 bg-gradient-to-r ${getStatusColor(tournament.status)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
          {getStatusText(tournament.status)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{tournament.name}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>
            {formatDate(tournament.start_date, tournament.end_date)}
            {tournament.time && ` - ${tournament.time}`}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          {tournament.entryFee && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Entry Fee:</span>
              <span className="text-white font-medium">₹{tournament.entryFee?.toLocaleString() || '0'}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Prize Pool:</span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold text-lg">
              ₹{tournament.prize_pool?.toLocaleString() || '0'}
            </span>
          </div>
          
          {tournament.participants && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                {tournament.type === 'solo' ? 'Players:' : 'Teams:'}
              </span>
              <span className="text-white font-medium">
                {tournament.participants?.current || 0}/{tournament.participants?.max || 0}
              </span>
            </div>
          )}
          
          {tournament.stage && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Stage:</span>
              <span className="text-white font-medium">{tournament.stage}</span>
            </div>
          )}
          
          {tournament.winner && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Winner:</span>
              <span className="text-yellow-400 font-medium flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                {tournament.winner}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => handleViewDetails(tournament)}
            className="flex-1 bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700 hover:border-purple-500/50 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            View Details
          </button>
          
          {tournament.status === 'upcoming' && (
            <button 
              onClick={() => handleRegisterClick(tournament)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium">
              Register Now
            </button>
          )}
          
          {tournament.status === 'ongoing' && (
            <button 
              onClick={() => handleLeaderboardClick(tournament)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              View Leaderboard
            </button>
          )}
          
          {tournament.status === 'completed' && (
            <button 
              onClick={() => handleLeaderboardClick(tournament)}
              className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium">
              Results
            </button>
          )}
        </div>
      </div>
    </div>
  );

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
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="pt-16 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    <GamepadIcon className="w-4 h-4 mr-2" />
                    Tournament Arena
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      COMPETE
                    </span>
                    <br />
                    <span className="text-white">& CONQUER</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Join the ultimate BGMI gaming experience. Compete with the best players, 
                    showcase your skills, and win incredible prizes in our premium tournaments.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => document.getElementById('tournaments-section').scrollIntoView({ behavior: 'smooth' })}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
                  >
                    <span className="flex items-center justify-center">
                      Join Tournament
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="group px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                    <span className="flex items-center justify-center">
                      <Play className="mr-2 w-5 h-5" />
                      Watch Highlights
                    </span>
                  </button>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 text-white">
                        {stat.icon}
                      </div>
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Filter className="h-5 w-5" />
                  <span className="font-semibold">Filter Tournaments</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <select 
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Tournaments</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                    <select 
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="all">All Types</option>
                      <option value="solo">Solo</option>
                      <option value="duo">Duo</option>
                      <option value="squad">Squad</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                    <select 
                      value={filters.sort}
                      onChange={(e) => setFilters({...filters, sort: e.target.value})}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="date">Date (Newest First)</option>
                      <option value="date-oldest">Date (Oldest First)</option>
                      <option value="prize">Prize Pool (Highest First)</option>
                      <option value="name">Name (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section id="tournaments-section" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTournaments.length === 0 ? (
              <div className="text-center py-16">
                <Target className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No Tournaments Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {filters.status === 'all' ? 'All' : 
                     filters.status === 'upcoming' ? 'Upcoming' :
                     filters.status === 'ongoing' ? 'Live' :
                     'Past'}{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Tournaments
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300">
                    Showing {filteredTournaments.length} tournament{filteredTournaments.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedTournaments.map(tournament => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-lg border border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 text-gray-400 hover:border-purple-500/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      currentPage === i + 1
                        ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 text-gray-400 hover:border-purple-500/50 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-lg border border-purple-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 text-gray-400 hover:border-purple-500/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
        )}
        

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Dominate</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players competing for glory and incredible prize pools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Register Now
              </button>
              <button className="px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                View Schedule
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <nav>
          <Footer />
        </nav>
      </div>

      {/* Tournament Details Modal */}
      <TournamentDetailsModal
        tournament={selectedTournament}
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        onRegisterClick={handleRegisterClick}
        onLeaderboardClick={handleLeaderboardClick}
      />

      {/* Registration Modal */}
      <RegistrationModal 
        tournament={selectedTournament}
        isOpen={showRegistrationModal}
        onClose={handleCloseRegistrationModal}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        tournament={selectedTournament}
        isOpen={showLeaderboardModal}
        onClose={handleCloseLeaderboardModal}
      />
    </div>
  );
};

export default TournamentPage;