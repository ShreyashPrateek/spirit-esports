import { useState, useEffect } from 'react';
import Header from './Header';
import { Play, Trophy, Users, Zap, ChevronDown, Star, ArrowRight } from 'lucide-react';
import Footer from './Footer';
import { supabase } from '../supabaseClient';

export default function SpiritEsportsLanding() {
  const [isMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isStreamComingSoon, setIsStreamComingSoon] = useState(true); // Control coming soon state
  const [tournaments, setTournaments] = useState([]);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

        // Fetch tournaments from Supabase
    const fetchTournaments = async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('date', { ascending: false })
        .limit(4); // Let's fetch 4 tournaments for now

      if (error) {
        console.error('Error fetching tournaments:', error);
      } else {
        setTournaments(data);
      }
    };

    fetchTournaments();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const tournaments = [
  //   { 
  //     name: "BGMI Championship", 
  //     prize: "₹5,00,000", 
  //     image: "🏆",
  //     date: "March 15, 2025",
  //     teams: "128 Teams",
  //     status: "Registration Open"
  //   },
  //   { 
  //     name: "Squad Showdown", 
  //     prize: "₹2,00,000", 
  //     image: "🎯",
  //     date: "March 25, 2025", 
  //     teams: "64 Teams",
  //     status: "Coming Soon"
  //   },
  //   { 
  //     name: "Solo Masters", 
  //     prize: "₹1,00,000", 
  //     image: "👑",
  //     date: "April 5, 2025",
  //     teams: "200 Players", 
  //     status: "Registration Open"
  //   },
  //   { 
  //     name: "Weekly Clash", 
  //     prize: "₹50,000", 
  //     image: "⚡",
  //     date: "Every Sunday",
  //     teams: "32 Teams",
  //     status: "Ongoing"
  //   }
  // ];

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "BGMI Tournaments",
      description: "Weekly and monthly tournaments with massive prize pools up to ₹10 Lakh"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Squad Formation",
      description: "Find skilled teammates and form unbeatable BGMI squads"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Live Rankings",
      description: "Real-time leaderboards and match statistics tracking"
    }
  ];

  const stats = [
    { number: "25K+", label: "BGMI Players" },
    { number: "₹50L+", label: "Prize Pool" },
    { number: "200+", label: "Tournaments" },
    { number: "95%", label: "Satisfaction" }
  ];

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
          {[...Array(20)].map((_, i) => (
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
        {/* Navigation */}
        <nav>
          <Header />
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed top-16 inset-x-0 bg-black/95 backdrop-blur-md z-40 md:hidden">
            <div className="px-4 py-6 space-y-4">
              <a href="/Home" className="block py-2 hover:text-purple-400">Home</a>
              <a href="/Tournaments" className="block py-2 hover:text-purple-400">Tournaments</a>
              <a href="/Teams" className="block py-2 hover:text-purple-400">Teams</a>
              <a href="/Streams" className="block py-2 hover:text-purple-400">Streams</a>
              <a href="/Contact" className="block py-2 hover:text-purple-400">Contact</a>
              <div className="pt-4 space-y-3">
                <button className="w-full px-4 py-2 text-purple-400 border border-purple-400 rounded-lg">Login</button>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">Join Now</button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="pt-16 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    <Star className="w-4 h-4 mr-2" />
                    #1 Gaming Platform
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      DOMINATE
                    </span>
                    <br />
                    <span className="text-white">THE ARENA</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-lg">
                    Join India's premier BGMI tournament platform. Compete with the best squads, win massive prizes, and become a mobile gaming legend.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      <a href="/tournament">Register for Tournament</a>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="group px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                    <span className="flex items-center justify-center">
                      <Play className="mr-2 w-5 h-5" />
                      View Live Matches
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BGMI Stream Card with Coming Soon */}
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-purple-500/20">
                    <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                      {/* Phone emoji background */}
                      <div className="text-6xl opacity-30">📱</div>
                      
                      {/* Live badge */}
                      <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                        LIVE BGMI
                      </div>
                      
                      {/* Coming Soon Overlay */}
                      {isStreamComingSoon && (
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center space-y-4">
                            {/* Coming Soon Text with Glow Effect */}
                            <div className="relative">
                              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                COMING SOON
                              </h2>
                              <div className="absolute inset-0 text-2xl md:text-3xl font-bold text-purple-400/20 blur-sm">
                                COMING SOON
                              </div>
                            </div>
                            
                            {/* Clock icon */}
                            <div className="text-3xl animate-pulse">⏰</div>
                            
                            {/* Additional info */}
                            <p className="text-gray-300 text-sm">Squad Finals Starting Soon</p>
                            
                            {/* Animated dots */}
                            <div className="flex justify-center space-x-1">
                              {[0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                  style={{ animationDelay: `${i * 0.2}s` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">BGMI Championship</span>
                        <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">LIVE</span>
                      </div>
                      <h3 className="text-xl font-bold">Squad Finals - Erangel</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-2 border-black"></div>
                          ))}
                        </div>
                        <span className="text-gray-400">45K viewers</span>
                      </div>
                    </div>
                    
                    {/* Demo toggle button - you can remove this in production */}
                    <button
                      onClick={() => setIsStreamComingSoon(!isStreamComingSoon)}
                      className="mt-4 w-full px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-lg transition-colors text-sm border border-purple-500/30"
                    >
                      {isStreamComingSoon ? 'Preview Stream' : 'Show Coming Soon'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </div>
        </section>

        {/* Upcoming Tournaments Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Upcoming Tournaments
                </span>
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Your next challenge awaits. Register now and prove your skills.
              </p>
            </div>

            {/* Tournament Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tournaments.map((tournament) => (
                <div 
                  key={tournament.id} 
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                >
                  <img 
                    className="w-full h-40 object-cover" 
                    src={tournament.image || '/images/spiritOpen.jpg'} // Use a fallback image
                    alt={tournament.name} 
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 truncate">{tournament.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{new Date(tournament.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-sm">Prize Pool</span>
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
                        ₹{tournament.prizePool.toLocaleString()}
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-purple-600/50 border border-purple-500 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a href="/tournament" className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700">
                View All Tournaments
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>



        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Spirit BGMI</span>
              </h2>
              <p className="text-xl text-gray-300">India's premier BGMI tournament platform</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Conquer the Battleground</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of BGMI players competing for glory and massive cash prizes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Register for BGMI Tournament
              </button>
              <button className="px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <nav>
          <Footer />
        </nav>
      </div>
    </div>
  );
}