import React from 'react';
import { Swords, Twitter, Youtube, Twitch, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';

  const comingSoonToast = () => {
    toast.success('Please Stay Tuned, Coming Soon!');
  };

export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SPIRIT ESPORTS
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              India's premier BGMI tournament platform for mobile gaming enthusiasts. Join thousands of players competing for glory and massive cash prizes.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              <a 
                href="/Discord" 
                className="w-10 h-10 bg-gray-900 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Discord"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a 
                href="/Twitter" 
                className="w-10 h-10 bg-gray-900 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="/YouTube" 
                className="w-10 h-10 bg-gray-900 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="/Twitch" 
                className="w-10 h-10 bg-gray-900 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Twitch"
              >
                <Twitch className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Tournaments Section */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Tournaments</h4>
            <div className="space-y-3">
              <a href="/tournament" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                BGMI Championship
              </a>
              <a href="/tournament" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Squad Showdown
              </a>
              <a href="/tournament" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Solo Masters
              </a>
              <a href="/tournament" onClick={comingSoonToast}className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Weekly Clash
              </a>
              <a href="/tournament" className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                View All Tournaments
              </a>
            </div>
          </div>
          
          {/* Company Section */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <div className="space-y-3">
              <a href="/about" className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                About Us
              </a>
              <a href="/about" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Careers
              </a>
              <a href="/about" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Press Kit
              </a>
              <a href="/about" onClick={comingSoonToast}className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Partners
              </a>
              <a href="/contact" className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Support & Legal Section */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Support & Legal</h4>
            <div className="space-y-3">
              <a href="/contact" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Help Center
              </a>
              <a href="/tournament" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Tournament Rules
              </a>
              <a href="/tournament" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Privacy Policy
              </a>
              <a href="/tournament" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Terms of Service
              </a>
              <a href="/contact" onClick={comingSoonToast} className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 transform">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Info Section */}
        <div className="py-8 border-t border-purple-500/20">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Email Us</div>
                <div className="text-white font-semibold">Coming Soon</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <Phone className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Call Us</div>
                <div className="text-white font-semibold">Coming Soon</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Location</div>
                <div className="text-white font-semibold">Remote - India</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="py-8 border-t border-purple-500/20">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-bold text-lg mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-400 mb-6">Get the latest tournament updates and gaming news</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />
              <button className="px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-purple-500/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; 2025 Spirit Esports. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/sitemap" className="text-gray-400 hover:text-purple-400 transition-colors">
                Sitemap
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-purple-400 transition-colors">
                Accessibility
              </a>
              <a href="/security" className="text-gray-400 hover:text-purple-400 transition-colors">
                Security
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}