import { useState, useEffect } from 'react';
import { Trophy, Users, Zap, Target, Shield, Star, ArrowRight, Play, GamepadIcon } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: "50K+", label: "Active Players", icon: <Users className="w-6 h-6" /> },
    { number: "₹1Cr+", label: "Prize Distributed", icon: <Trophy className="w-6 h-6" /> },
    { number: "500+", label: "Tournaments Hosted", icon: <Target className="w-6 h-6" /> },
    { number: "99%", label: "Player Satisfaction", icon: <Star className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fair Play",
      description: "We ensure transparent and fair gaming environment for all players with strict anti-cheat measures."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Excellence",
      description: "Striving for the highest standards in tournament organization and player experience."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building a strong, supportive gaming community where players can grow and compete."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology and features."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "👨‍💼",
      description: "Former pro gamer with 8+ years in esports industry"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "👩‍💼",
      description: "Expert in tournament management and player relations"
    },
    {
      name: "Amit Singh",
      role: "Tech Lead",
      image: "👨‍💻",
      description: "Gaming technology specialist with competitive gaming background"
    },
    {
      name: "Sneha Patel",
      role: "Community Manager",
      image: "👩‍🎮",
      description: "Building bridges between players and organizing community events"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Spirit Esports Founded",
      description: "Started with a vision to revolutionize mobile gaming in India"
    },
    {
      year: "2023",
      title: "First Major Tournament",
      description: "Hosted our flagship BGMI Championship with ₹10 Lakh prize pool"
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Reached 25K+ active players and 100+ successful tournaments"
    },
    {
      year: "2025",
      title: "New Heights",
      description: "Expanding to multiple games and international tournaments"
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
                    About Spirit Esports
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      POWERING
                    </span>
                    <br />
                    <span className="text-white">GAMING DREAMS</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    We're India's premier esports platform, dedicated to creating opportunities for mobile gamers to showcase their skills, compete at the highest level, and build lasting gaming careers.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                    <span className="flex items-center justify-center">
                      Join Our Community
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="group px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all">
                    <span className="flex items-center justify-center">
                      <Play className="mr-2 w-5 h-5" />
                      Watch Our Story
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

        {/* Our Story Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Our Story
                  </span>
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg">
                    Spirit Esports was born from a simple belief: every gamer deserves a platform to showcase their skills and achieve their dreams. Founded by passionate gamers who understood the challenges faced by the Indian esports community.
                  </p>
                  <p className="text-lg">
                    Starting with just a handful of tournaments, we've grown into India's most trusted esports platform, hosting hundreds of tournaments and distributing millions in prize money.
                  </p>
                  <p className="text-lg">
                    Today, we're not just organizing tournaments - we're building careers, fostering communities, and putting Indian esports on the global map.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform -rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-purple-500/20">
                    <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                      <div className="text-6xl">🎮</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">The Journey Continues</h3>
                        <p className="text-gray-300 text-sm">Building the future of Indian esports</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-xl text-gray-300">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105 hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-300">Key milestones that shaped our growth</p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all">
                        <div className="text-2xl font-bold text-purple-400 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-black z-10"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Meet Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-300">The passionate individuals behind Spirit Esports</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all transform hover:scale-105 hover:-translate-y-2">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-400 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Join the Revolution</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Become part of India's fastest-growing esports community and turn your gaming passion into success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="px-8 py-4 border border-purple-400 rounded-lg text-lg font-semibold hover:bg-purple-400 hover:text-black transition-all"
              onClick={() => window.location.href = '/contact'}>
                Contact Us
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