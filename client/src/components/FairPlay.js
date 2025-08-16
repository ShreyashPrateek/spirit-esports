import { useState, useEffect } from 'react';
import Header from './Header';
import { Shield, Clock, AlertTriangle, MessageSquare, Headphones, ArrowRight, Swords, Eye, Ban, FileText } from 'lucide-react';

export default function FairPlaySupport() {
  const [isMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fairPlayFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Anti-Cheat System",
      description: "AI-powered detection system that monitors gameplay in real-time to identify suspicious behavior and cheating attempts"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Live Match Monitoring",
      description: "Experienced moderators watch live matches and can intervene instantly if any violations are detected"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Transparent Reporting",
      description: "Clear and accessible reporting system with detailed investigation process and public case reviews"
    },
    {
      icon: <Ban className="w-8 h-8" />,
      title: "Swift Action Policy",
      description: "Immediate penalties for rule violations including temporary suspensions, permanent bans, and prize forfeitures"
    }
  ];

  const supportServices = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Player Support",
      description: "Round-the-clock support team available via chat, email, and phone for any tournament-related queries",
      availability: "Always Available"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Dispute Resolution",
      description: "Quick resolution of match disputes with average response time of under 15 minutes during tournaments",
      availability: "< 15 min response"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Community Forums",
      description: "Active community discussions, rule clarifications, and peer-to-peer support from experienced players",
      availability: "Community Driven"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Emergency Response",
      description: "Dedicated emergency team for critical issues during live tournaments and major competitions",
      availability: "Critical Issues Only"
    }
  ];

  const stats = [
    { number: "99.8%", label: "Fair Play Rate" },
    { number: "< 2min", label: "Avg Response" },
    { number: "15K+", label: "Issues Resolved" },
    { number: "24/7", label: "Support Hours" }
  ];

  const reportingProcess = [
    {
      step: "1",
      title: "Report Incident",
      description: "Submit detailed report with match ID, player details, and evidence"
    },
    {
      step: "2", 
      title: "Investigation",
      description: "Our team reviews gameplay footage and analyzes match data"
    },
    {
      step: "3",
      title: "Decision",
      description: "Fair judgment based on evidence with detailed explanation"
    },
    {
      step: "4",
      title: "Action Taken",
      description: "Appropriate penalties applied and all parties notified"
    }
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
                  <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm border border-green-500/30">
                    <Shield className="w-4 h-4 mr-2" />
                    Fair Play Certified
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      FAIR PLAY
                    </span>
                    <br />
                    <span className="text-white">& SUPPORT</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-lg">
                    We maintain the highest standards of competitive integrity in BGMI tournaments. Our dedicated anti-cheat systems, experienced moderators, and transparent reporting mechanisms ensure every match is fair.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      Report an Issue
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="group px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                    <span className="flex items-center justify-center">
                      <MessageSquare className="mr-2 w-5 h-5" />
                      Contact Support
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
                      <div className="text-6xl">🛡️</div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                        SECURE
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">Fair Play System</span>
                        <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">ACTIVE</span>
                      </div>
                      <h3 className="text-xl font-bold">Real-time Monitoring</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-400">25K+ matches monitored</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fair Play Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Fair Play System
                </span>
              </h2>
              <p className="text-xl text-gray-300">Advanced technology ensuring competitive integrity</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fairPlayFeatures.map((feature, index) => (
                <div key={index} className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Services Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Player <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Support Services</span>
              </h2>
              <p className="text-xl text-gray-300">Get help when you need it most</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {supportServices.map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105">
                  <div className="flex items-start space-x-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                          {service.availability}
                        </span>
                      </div>
                      <p className="text-gray-300">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reporting Process Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Reporting Process
                </span>
              </h2>
              <p className="text-xl text-gray-300">Simple, transparent, and effective</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reportingProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                      {process.step}
                    </div>
                    {index < reportingProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform -translate-y-0.5"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                  <p className="text-gray-300">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Help or Want to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Report an Issue</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here 24/7 to ensure fair play and help with any concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Contact Support Now
              </button>
              <button className="px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                View Tournament Rules
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
                <h4 className="font-semibold mb-4">Support</h4>
                <div className="space-y-2">
                  <a href="/Help Center" className="block text-gray-400 hover:text-purple-400">Help Center</a>
                  <a href="/Report Issue" className="block text-gray-400 hover:text-purple-400">Report Issue</a>
                  <a href="/Tournament Rules" className="block text-gray-400 hover:text-purple-400">Tournament Rules</a>
                  <a href="/Fair Play Policy" className="block text-gray-400 hover:text-purple-400">Fair Play Policy</a>
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
                  <a href="/Discord" className="block text-gray-400 hover:text-purple-400">Discord</a>
                  <a href="/Twitter" className="block text-gray-400 hover:text-purple-400">Twitter</a>
                  <a href="/YouTube" className="block text-gray-400 hover:text-purple-400">YouTube</a>
                  <a href="/Twitch" className="block text-gray-400 hover:text-purple-400">Twitch</a>
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