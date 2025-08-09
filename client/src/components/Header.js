import { useState, useEffect } from 'react';
import { Swords, Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <a 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300"
            >
              SPIRIT ESPORTS
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <a href="/about" className="hover:text-purple-400 transition-colors">About Us</a>
              
              {/* Dropdown for "What we offer" */}
              <div className="relative">
                <button 
                  className="hover:text-purple-400 transition-colors flex items-center space-x-1"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <span>What we offer</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-black/95 backdrop-blur-md border border-purple-500/20 rounded-lg py-2 shadow-xl transition-all ${
                    isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <a href="/game-hosting" className="block px-4 py-3 text-sm hover:text-purple-400 hover:bg-purple-400/10 transition-colors">
                    Game Hosting
                  </a>
                  <a href="/organiser-support" className="block px-4 py-3 text-sm hover:text-purple-400 hover:bg-purple-400/10 transition-colors">
                    Organiser Support
                  </a>
                  <a href="/custom-tournaments" className="block px-4 py-3 text-sm hover:text-purple-400 hover:bg-purple-400/10 transition-colors">
                    Custom Tournaments
                  </a>
                </div>
              </div>
              
              <a href="/tournament" className="hover:text-purple-400 transition-colors">Tournament</a>
              <a href="/contact" className="hover:text-purple-400 transition-colors">Contact</a>
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 inset-x-0 bg-black/95 backdrop-blur-md z-40 md:hidden">
          <div className="px-4 py-6 space-y-4">
            <a href="/about" className="block py-2 hover:text-purple-400">About Us</a>
            
            {/* Mobile Dropdown Items */}
            <div className="py-2">
              <div className="text-purple-400 font-semibold mb-2">What we offer</div>
              <div className="ml-4 space-y-2">
                <a href="/game-hosting" className="block py-1 text-sm hover:text-purple-400">Game Hosting</a>
                <a href="/organiser-support" className="block py-1 text-sm hover:text-purple-400">Organiser Support</a>
                <a href="/custom-tournaments" className="block py-1 text-sm hover:text-purple-400">Custom Tournaments</a>
              </div>
            </div>
            
            <a href="/tournament" className="block py-2 hover:text-purple-400">Tournament</a>
            <a href="/contact" className="block py-2 hover:text-purple-400">Contact</a>
            <div className="pt-4 space-y-3">
              <button className="w-full px-4 py-2 text-purple-400 border border-purple-400 rounded-lg">Login</button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">Join Now</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}