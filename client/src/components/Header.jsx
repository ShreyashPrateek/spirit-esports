import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swords, Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Header() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOfferDropdownOpen, setIsOfferDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profile')
      .select('name')
      .eq('id', userId)
      .single();
    
    if (data && !error) {
      setUserName(data.name);
    }
  };

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchUserProfile(user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserName('');
      }
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full backdrop-blur-md border-b border-purple-500/20 z-50 transition-all ${
      scrollY > 50 ? 'bg-black/95' : 'bg-black/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Swords className="w-6 h-6" />
            </div>
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
            >
              SPIRIT ESPORTS
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link>
              
              {/* Dropdown for "What we offer" */}
              <div className="relative">
                <button 
                  className="hover:text-purple-400 transition-colors flex items-center space-x-1"
                  onClick={() => setIsOfferDropdownOpen(!isOfferDropdownOpen)}
                  onMouseEnter={() => setIsOfferDropdownOpen(true)}
                  onMouseLeave={() => setIsOfferDropdownOpen(false)}
                >
                  <span>What we offer</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOfferDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-black/95 backdrop-blur-md border border-purple-500/20 rounded-lg py-2 shadow-xl transition-all ${
                    isOfferDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setIsOfferDropdownOpen(true)}
                  onMouseLeave={() => setIsOfferDropdownOpen(false)}
                >
                  <Link to="/CustomTournament" className="block px-4 py-3 text-sm hover:text-purple-400 hover:bg-purple-400/10 transition-colors">
                    Exciting & Custom Tournaments
                  </Link>
                  <Link to="/ProGaming" className="block px-4 py-3 text-sm hover:text-purple-400 hover:bg-purple-400/10 transition-colors">
                    Pro-Grade Gaming Experience
                  </Link>
                  <Link to="/FairPlay" className="block px-4 py-3 text-sm hover:text-purple-400 hover:bg-purple-400/10 transition-colors">
                    Fair Play & Player Support
                  </Link>
                </div>
              </div>
              
              <Link to="/tournament" className="hover:text-purple-400 transition-colors">Tournament</Link>
              <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg hover:from-purple-500/30 hover:to-blue-500/30 transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-white font-medium">{userName || user.email.split('@')[0]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-purple-500/20 rounded-lg py-2 shadow-xl z-50">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-purple-400 hover:bg-purple-400/10 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400 hover:text-black transition-all">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all">
                  Join Now
                </Link>
              </>
            )}
          </div>

          

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>


      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 inset-x-0 bg-black/95 backdrop-blur-md z-40 md:hidden">
          <div className="px-4 py-6 space-y-4">
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-purple-400">About Us</Link>
            
            {/* Mobile Dropdown Items */}
            <div className="py-2">
              <div className="text-purple-400 font-semibold mb-2">What we offer</div>
              <div className="ml-4 space-y-2">
                <Link to="/ProGaming" onClick={() => setIsMenuOpen(false)} className="block py-1 text-sm hover:text-purple-400">Pro-Grade Gaming Experience</Link>
                <Link to="/FairPlay" onClick={() => setIsMenuOpen(false)} className="block py-1 text-sm hover:text-purple-400">Fair Play & Player Support</Link>
                <Link to="/CustomTournament" onClick={() => setIsMenuOpen(false)} className="block py-1 text-sm hover:text-purple-400">Exciting & Custom Tournaments</Link>
              </div>
            </div>
            
            <Link to="/tournament" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-purple-400">Tournament</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-purple-400">Contact</Link>
            <div className="pt-4 space-y-3">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-red-400 border border-red-400 rounded-lg text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full px-4 py-2 text-purple-400 border border-purple-400 rounded-lg text-center">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-center">Join Now</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}