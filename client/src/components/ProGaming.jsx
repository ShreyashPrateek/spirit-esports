import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Monitor, Wifi, Trophy, ChevronDown, Star, ArrowRight, Gamepad2, Shield, Activity, Video } from 'lucide-react';

export default function ProGradeExperience() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Lag-Free Servers",
      description: "Enterprise-grade servers with 99.9% uptime ensuring zero lag during crucial BGMI moments",
      details: [
        "Sub-20ms latency across India",
        "Dedicated game servers in major cities",
        "Real-time server monitoring",
        "Automatic failover systems"
      ]
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Professional Streaming",
      description: "Broadcast-quality streaming with multi-angle views and professional commentary",
      details: [
        "4K streaming capability",
        "Professional casting team",
        "Multiple camera angles",
        "Live match replays"
      ]
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Spectator Mode",
      description: "Advanced spectator features that rival international esports broadcasts",
      details: [
        "Player perspective switching",
        "Real-time statistics overlay",
        "Mini-map tracking",
        "Kill feed highlights"
      ]
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Custom Game Modes",
      description: "Unique BGMI tournament formats designed for competitive excellence",
      details: [
        "Custom zone settings",
        "Modified loot spawns",
        "Special event modes",
        "Practice lobbies"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Exclusive Skins",
      description: "Tournament-exclusive BGMI skins and rewards for participants",
      details: [
        "Spirit Esports branded items",
        "Tournament winner skins",
        "Participation rewards",
        "Achievement badges"
      ]
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-Time Leaderboards",
      description: "Live rankings and comprehensive match statistics tracking",
      details: [
        "Live kill tracking",
        "Team performance metrics",
        "Match history analysis",
        "Player progression stats"
      ]
    }
  ];

  const techSpecs = [
    { label: "Server Locations", value: "12+ Cities" },
    { label: "Maximum Capacity", value: "10,000 Players" },
    { label: "Average Latency", value: "<20ms" },
    { label: "Uptime Guarantee", value: "99.9%" },
    { label: "Streaming Quality", value: "4K HDR" },
    { label: "Spectator Modes", value: "8 Camera Angles" }
  ];

  const testimonials = [
    {
      name: "ProGamer_YT",
      role: "BGMI Content Creator",
      quote: "The server quality here is unmatched. Zero lag, crystal clear streaming - it's like playing on a different level!",
      rating: 5
    },
    {
      name: "SquadLeader_99",
      role: "Tournament Winner",
      quote: "These exclusive skins and custom modes make every tournament feel special. True pro-grade experience!",
      rating: 5
    },
    {
      name: "BGMI_Champion",
      role: "Professional Player",
      quote: "Finally, a platform that understands what competitive BGMI players need. The spectator mode is incredible!",
      rating: 5
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

        {/* Hero Section */}
        <section className="pt-16 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    <Star className="w-4 h-4 mr-2" />
                    Pro-Grade Infrastructure
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      PRO-GRADE
                    </span>
                    <br />
                    <span className="text-white">GAMING EXPERIENCE</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-lg">
                    Experience BGMI like never before with our premium tournament infrastructure. 
                    Lag-free servers, professional streaming setups, and spectator modes that rival international esports events.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      Experience Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="group px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                    <span className="flex items-center justify-center">
                      <Video className="mr-2 w-5 h-5" />
                      Watch Demo
                    </span>
                  </button>
                </div>

                {/* Tech Specs */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  {techSpecs.slice(0, 4).map((spec, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg border border-purple-500/20">
                      <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {spec.value}
                      </div>
                      <div className="text-xs text-gray-400">{spec.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-purple-500/20">
                    <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl">🖥️</div>
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                        99.9% UPTIME
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                        4K STREAM
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded">
                        &lt;20ms LATENCY
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">Server Status</span>
                        <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">OPTIMAL</span>
                      </div>
                      <h3 className="text-xl font-bold">Enterprise-Grade Infrastructure</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-green-400" />
                          <span className="text-gray-400">Live Monitoring</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-400">DDoS Protected</span>
                        </div>
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

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Premium Features
                </span>
              </h2>
              <p className="text-xl text-gray-300">Everything you need for a professional BGMI tournament experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Technical <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Specifications</span>
              </h2>
              <p className="text-xl text-gray-300">Industry-leading infrastructure powering your gaming experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techSpecs.map((spec, index) => (
                <div key={index} className="text-center p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {spec.value}
                  </div>
                  <div className="text-gray-300 font-medium">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Players Say</span>
              </h2>
              <p className="text-xl text-gray-300">Hear from BGMI professionals who've experienced the difference</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-purple-400">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Pro Difference</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the next level of competitive BGMI gaming with our professional-grade infrastructure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Start Your Pro Journey
              </button>
              <button className="px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                Schedule Demo
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