import { useState, useEffect } from 'react';
import { Play, Trophy, Users, Zap, ChevronDown, Menu, X, Star, ArrowRight, Swords } from 'lucide-react';

export default function SpiritEsportsLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tournaments = [
    { 
      name: "BGMI Championship", 
      prize: "₹5,00,000", 
      image: "🏆",
      date: "March 15, 2025",
      teams: "128 Teams",
      status: "Registration Open"
    },
    { 
      name: "Squad Showdown", 
      prize: "₹2,00,000", 
      image: "🎯",
      date: "March 25, 2025", 
      teams: "64 Teams",
      status: "Coming Soon"
    },
    { 
      name: "Solo Masters", 
      prize: "₹1,00,000", 
      image: "👑",
      date: "April 5, 2025",
      teams: "200 Players", 
      status: "Registration Open"
    },
    { 
      name: "Weekly Clash", 
      prize: "₹50,000", 
      image: "⚡",
      date: "Every Sunday",
      teams: "32 Teams",
      status: "Ongoing"
    }
  ];

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
        <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-purple-500/20 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Swords className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  SPIRIT ESPORTS
                </span>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-8">
                  <a href="/Home" className="hover:text-purple-400 transition-colors">Home</a>
                  <a href="/Tournamnet" className="hover:text-purple-400 transition-colors">Tournaments</a>
                  <a href="/Teams" className="hover:text-purple-400 transition-colors">Teams</a>
                  <a href="/Streams" className="hover:text-purple-400 transition-colors">Streams</a>
                  <a href="/Contact" className="hover:text-purple-400 transition-colors">Contact</a>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <button className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400 hover:text-black transition-all">
                  Login
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all">
                  Join Now
                </button>
              </div>

              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
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
                      Register for Tournament
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

              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-purple-500/20">
                    <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl">📱</div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                        LIVE BGMI
                      </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </div>
        </section>

        {/* BGMI Tournaments Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  BGMI Tournaments
                </span>
              </h2>
              <p className="text-xl text-gray-300">Join the biggest mobile gaming tournaments in India</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tournaments.map((tournament, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{tournament.image}</div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      tournament.status === 'Registration Open' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      tournament.status === 'Coming Soon' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="text-purple-400 font-semibold">{tournament.prize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">{tournament.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Slots:</span>
                      <span className="text-white">{tournament.teams}</span>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform group-hover:scale-105">
                    {tournament.status === 'Registration Open' ? 'Register Now' : 
                     tournament.status === 'Coming Soon' ? 'Notify Me' : 'View Details'}
                  </button>
                </div>
              ))}
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
        <footer className="bg-black border-t border-purple-500/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Swords className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    SPIRIT ESPORTS
                  </span>
                </div>
                <p className="text-gray-400">India's premier BGMI tournament platform for mobile gaming enthusiasts.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Tournaments</h4>
                <div className="space-y-2">
                  <a href="" className="block text-gray-400 hover:text-purple-400">BGMI Championship</a>
                  <a href="" className="block text-gray-400 hover:text-purple-400">Squad Showdown</a>
                  <a href="" className="block text-gray-400 hover:text-purple-400">Solo Masters</a>
                  <a href="" className="block text-gray-400 hover:text-purple-400">Weekly Clash</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2">
                  <a href="/About" className="block text-gray-400 hover:text-purple-400">About</a>
                  <a href="/Careers" className="block text-gray-400 hover:text-purple-400">Careers</a>
                  <a href="/Press" className="block text-gray-400 hover:text-purple-400">Press</a>
                  <a href="/Contact" className="block text-gray-400 hover:text-purple-400">Contact</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <div className="space-y-2">
                  <a href="" className="block text-gray-400 hover:text-purple-400">Discord</a>
                  <a href="" className="block text-gray-400 hover:text-purple-400">Twitter</a>
                  <a href="" className="block text-gray-400 hover:text-purple-400">YouTube</a>
                  <a href="" className="block text-gray-400 hover:text-purple-400">Twitch</a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Spirit Esports. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}