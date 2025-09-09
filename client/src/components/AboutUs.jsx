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
    { number: "1000+", label: "Active Players", icon: <Users className="w-6 h-6" /> },
    { number: "₹10K+", label: "Prize Distributed", icon: <Trophy className="w-6 h-6" /> },
    { number: "50+", label: "Tournaments Hosted", icon: <Target className="w-6 h-6" /> },
    { number: "99%", label: "Player Satisfaction", icon: <Star className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fair Play",
      description: "Spirit Esports ensures fair competition through advanced anti-cheat systems and transparent matchmaking on India's most trusted gaming platform."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Excellence",
      description: "As the best gaming website in India, Spirit Esports delivers professional-grade tournaments with cutting-edge technology and seamless user experience."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Spirit Esports connects India's largest gaming community across Mumbai, Delhi, Bangalore, and Chennai through events and collaborative features."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Spirit Esports pioneers India's gaming technology with AI matchmaking and blockchain rewards, positioning us as leaders in India's gaming industry."
    }
  ];

  const team = [
    {
      name: "Shreyash Prateek",
      role: "Co-Founder",
      image: "👨‍💼",
      description: "Former pro gamer with 6+ years in esports industry"
    },
    {
      name: "Abhishek Kumar",
      role: "Product Manager",
      image: "👨‍💻",
      description: "Platform feature development and user experience optimization"
    },
    {
      name: "Sahil Sharma",
      role: "Community Manager",
      image: "👨‍💼",
      description: "Gaming technology specialist with competitive gaming background"
    },
    {
      name: "Saqulain Jasim",
      role: "Tournament Operations Director",
      image: "👨‍💼",
      description: "Oversees all competitive events and ensures smooth operations"
    },
    {
      name: "Yadhuvanshi Vishal",
      role: "Esports Coach/Training Coordinator",
      image: "👨‍💼",
      description: "Offer player development services and coaching"
    },
    {
      name: "Deepak Kumar",
      role: "Marketing Specialist",
      image: "👨‍💼",
      description: "Responsible for targeted campaigns and user acquisition"
    },
    {
      name: "Karan Singh",
      role: "Content Creator",
      image: "👨‍💼",
      description: "Creates engaging content and articles to help players understand esports"
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Spirit Esports Founded",
      description: "Started with a vision to revolutionize mobile gaming in India"
    },
    {
      year: "2020",
      title: "First Major Tournament",
      description: "Hosted our flagship BGMI Championship Named Spirit Open Customs"
    },
    {
      year: "2020",
      title: "Community Growth",
      description: "Reached 500+ active players and 5+ successful tournaments"
    },
    {
      year: "2025",
      title: "Re-Establish Spirit Esports",
      description: "Reopening the platform with new features and bigger ambitions"
    },
    {
      year: "2025",
      title: "Future Plans",
      description: "Expanding website and recruiting top talent to lead Indian esports"
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
                    India's #1 trusted esports platform where skill meets opportunity. Spirit Esports has revolutionized competitive gaming in India through transparent tournaments, fair play enforcement, and career-building programs that have established us as the gold standard for professional gaming platforms nationwide.                  </p>
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
                <div className="space-y-4 text-gray-300 text-justify">
                  <p className="text-lg">
                    Spirit Esports was founded to create the best gaming website in India, empowering every gamer to showcase their skills and achieve esports success. Built by passionate Indian gamers, we bridged the gap between casual gaming and professional esports competition.                  </p>
                  <p className="text-lg">
                    Starting with local tournaments across Mumbai, Delhi, Bangalore, and Chennai, Spirit Esports has grown into India's premier gaming platform. We've evolved from hosting dozens of players to connecting millions of Indian gamers, establishing ourselves as the country's most trusted esports destination.                  </p>
                  <p className="text-lg">
                    Today, Spirit Esports leads as the best gaming website in India, distributing crores in prize money and launching gaming careers nationwide. We're building the infrastructure that elevates Indian esports globally, nurturing world-class gaming talent across the country.                  </p>
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
              Unlock your competitive gaming potential on India's most rewarding esports platform. Access high-stakes tournaments, professional networking opportunities, and the resources needed to transform your gaming passion into a lucrative career in India's booming esports industry.            </p>
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