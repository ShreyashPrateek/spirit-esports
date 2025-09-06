import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Trophy, Users, ChevronDown, ArrowRight, Clock, Target, Crown, Gamepad2, Award, Settings, X, Calendar, DollarSign, User } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ExcitingCustomTournaments() {
  const [isMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    prizePool: '',
    type: 'Squad',
    details: ''
  });


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user); // Debug
    if (user) {
      setUser(user);
      // Check if user is authorized to create tournaments
      const { data } = await supabase
        .from('authorized_users')
        .select('*')
        .eq('user_id', user.id)
        .single();
      console.log('Authorization data:', data); // Debug
      setIsAuthorized(!!data);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    if (!user || !isAuthorized) {
      alert('You are not authorized to create tournaments');
      return;
    }

    setLoading(true);
    try {
      // Set default image based on tournament type
      const defaultImages = {
        'Squad': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        'Duo': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', 
        'Solo': 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400'
      };
      const imageUrl = defaultImages[formData.type];

      const insertData = {
        name: formData.name,
        organized_by: user.user_metadata?.full_name || user.email,
        start_date: formData.startDate,
        prize_pool: parseInt(formData.prizePool),
        type: formData.type,
        details: formData.details,
        image_url: imageUrl,
        creator_id: user.id
      };
      
      console.log('Inserting data:', insertData);
      
      const { error } = await supabase
        .from('custom_tournaments')
        .insert(insertData);

      if (error) throw error;
      
      alert('Tournament created successfully!');
      setShowCreateForm(false);
      setFormData({ name: '', startDate: '', prizePool: '', type: 'Squad', details: '' });
    } catch (error) {
      alert('Error creating tournament: ' + error.message);
    } finally {
      setLoading(false);

    }
  };

  const tournamentFormats = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Daily Scrims",
      description: "Quick 30-minute practice matches with small prize pools for skill improvement",
      frequency: "Every 2 Hours",
      prizeRange: "₹500 - ₹2,000",
      duration: "30 mins",
      teams: "16-32 Teams"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Weekly Showdowns",
      description: "Competitive weekly tournaments with moderate stakes and growing competition",
      frequency: "Every Weekend", 
      prizeRange: "₹10,000 - ₹50,000",
      duration: "3-4 Hours",
      teams: "64-128 Teams"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Monthly Championships",
      description: "Premium tournaments with massive prize pools and professional broadcasting",
      frequency: "Monthly",
      prizeRange: "₹1,00,000 - ₹10,00,000", 
      duration: "Full Day",
      teams: "256+ Teams"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Custom Events",
      description: "Tailored tournaments for organizations, colleges, and private groups",
      frequency: "On Demand",
      prizeRange: "Custom",
      duration: "Flexible",
      teams: "Any Size"
    }
  ];

  const customTournamentFeatures = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Full Customization",
      description: "Choose maps, game modes, team sizes, match duration, and scoring systems"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Private Lobbies",
      description: "Exclusive tournament rooms for your organization, college, or gaming community"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Custom Prizes",
      description: "Set your own prize pools, sponsor rewards, and special recognition systems"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Multiple Formats",
      description: "Solo, duo, squad tournaments with bracket, round-robin, or swiss formats"
    }
  ];

  const stats = [
    { number: "500+", label: "Daily Tournaments" },
    { number: "₹2Cr+", label: "Monthly Prizes" },
    { number: "50K+", label: "Active Players" },
    { number: "24/7", label: "Tournaments" }
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
                  <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm border border-orange-500/30">
                    <Trophy className="w-4 h-4 mr-2" />
                    Endless Tournaments
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      EXCITING
                    </span>
                    <br />
                    <span className="text-white">TOURNAMENTS</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-lg">
                    Daily scrims to weekend championships - diverse BGMI tournament formats for every skill level and playstyle. From beginner-friendly matches to professional-grade competitions.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => window.location.href = '/tournaments'}
                    className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
                  >
                    <span className="flex items-center justify-center">
                      Join Next Tournament
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button 
                    onClick={() => {
                      if (!user) {
                        alert('Please login to create tournaments');
                        return;
                      }
                      if (!isAuthorized) {
                        alert('You are not authorized to create tournaments. Contact admin.');
                        return;
                      }
                      setShowCreateForm(true);
                    }}
                    className="group px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all"
                  >
                    <span className="flex items-center justify-center">
                      <Settings className="mr-2 w-5 h-5" />
                      Create Custom Event
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
                      <div className="text-6xl">🏆</div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                        LIVE NOW
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">Weekend Warriors</span>
                        <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">LIVE</span>
                      </div>
                      <h3 className="text-xl font-bold">Quarter Finals - Sanhok</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-2 border-black"></div>
                          ))}
                        </div>
                        <span className="text-gray-400">128 teams competing</span>
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

        {/* Tournament Formats Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Tournament Formats
                </span>
              </h2>
              <p className="text-xl text-gray-300">Something for every skill level and schedule</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tournamentFormats.map((format, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 text-white">
                    {format.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{format.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{format.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Frequency:</span>
                      <span className="text-purple-400 font-semibold">{format.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Prize Range:</span>
                      <span className="text-green-400 font-semibold">{format.prizeRange}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{format.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Teams:</span>
                      <span className="text-white">{format.teams}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tournament Creation Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  How It Works
                </span>
              </h2>
              <p className="text-xl text-gray-300">Creating your perfect tournament in 4 simple steps</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  icon: "🎯",
                  title: "Choose Format",
                  description: "Select from daily scrims, weekly showdowns, monthly championships, or create custom events"
                },
                {
                  step: "2", 
                  icon: "⚙️",
                  title: "Configure Settings",
                  description: "Set team size, maps, game modes, entry fees, prize pools, and match schedules"
                },
                {
                  step: "3",
                  icon: "📢",
                  title: "Publish & Promote",
                  description: "Go live instantly and share with your community. We handle registrations and payments"
                },
                {
                  step: "4",
                  icon: "🏆",
                  title: "Execute & Celebrate",
                  description: "We manage the tournament flow, track results, and distribute prizes automatically"
                }
              ].map((process, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {process.step}
                    </div>
                    <div className="text-4xl mb-4">{process.icon}</div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform -translate-y-0.5"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{process.title}</h3>
                  <p className="text-gray-300">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Tournament Features */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Create <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Custom Tournaments</span>
              </h2>
              <p className="text-xl text-gray-300">Tailored tournaments for your community</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {customTournamentFeatures.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => {
                  if (!user) {
                    alert('Please login to create tournaments');
                    return;
                  }
                  if (!isAuthorized) {
                    alert('You are not authorized to create tournaments. Contact admin.');
                    return;
                  }
                  setShowCreateForm(true);
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Create Custom Tournament
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Join the Competition</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From casual daily scrims to intense championship battles - find your perfect tournament format
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/tournaments'}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Browse All Tournaments
              </button>
              <button 
                onClick={() => {
                  if (!user) {
                    alert('Please login to create tournaments');
                    return;
                  }
                  if (!isAuthorized) {
                    alert('You are not authorized to create tournaments. Contact admin.');
                    return;
                  }
                  setShowCreateForm(true);
                }}
                className="px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all"
              >
                Schedule Custom Event
              </button>
            </div>
          </div>
        </section>

        {/* Tournament Creation Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-purple-500/20 my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Create Tournament
                </h3>
                <button 
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateTournament} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tournament Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none"
                    placeholder="Enter tournament name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Organized By</label>
                  <div className="flex items-center px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg">
                    <User className="w-5 h-5 mr-2 text-purple-400" />
                    <span className="text-gray-300">{user?.user_metadata?.full_name || user?.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Prize Pool (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                    <input
                      type="number"
                      name="prizePool"
                      value={formData.prizePool}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none"
                      placeholder="Enter prize amount"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tournament Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none"
                  >
                    <option value="Squad">Squad (4 Players)</option>
                    <option value="Duo">Duo (2 Players)</option>
                    <option value="Solo">Solo (1 Player)</option>
                  </select>
                </div>
                

                
                <div>
                  <label className="block text-sm font-medium mb-2">Tournament Details</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
                    placeholder="Enter tournament rules, format, and other details..."
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Tournament'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <nav>
          <Footer />
        </nav>
      </div>
    </div>
  );
}