import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, User, Phone, Mail, MessageSquare, FileText, Swords, ArrowLeft, MapPin, Clock, Users } from 'lucide-react';

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    subject: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Message sent successfully! We will get back to you soon.');
      handleCancel();
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      whatsapp: '',
      email: '',
      subject: '',
      description: ''
    });
    setErrors({});
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Location",
      details: "Bengaluru, Karnataka, India"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      details: "Within 24 hours"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Support Team",
      details: "BGMI Experts Available"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`
            }}
          ></div>
        </div>
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
        {/* Navigation */}
        <nav className="bg-black/80 backdrop-blur-md border-b border-purple-500/20">
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
              
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 text-purple-400 hover:text-purple-300 transition-colors hover:bg-purple-400/10 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to dominate the BGMI arena? Get in touch with our team for tournaments, partnerships, or any questions about our platform.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
                  <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.name ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* WhatsApp Field */}
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.whatsapp ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                      }`}
                      placeholder="+91 9876543210"
                    />
                    {errors.whatsapp && <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.email ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        errors.subject ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="Tournament Registration">Tournament Registration</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Partnership Inquiry">Partnership Inquiry</option>
                      <option value="Sponsorship">Sponsorship Opportunities</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  {/* Description Field */}
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all ${
                        errors.description ? 'border-red-500' : 'border-purple-500/30 focus:border-purple-500'
                      }`}
                      placeholder="Please describe your inquiry in detail..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                      <p className="text-gray-500 text-sm ml-auto">{formData.description.length}/500</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center px-6 py-3 border border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Info Cards */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/50 transition-all">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-3">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                          <p className="text-gray-300">{info.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tournament Highlights */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Why Contact Us?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Tournament registration assistance
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Technical support for matches
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      Partnership opportunities
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Prize distribution queries
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Custom tournament creation
                    </li>
                  </ul>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold mb-4">Response Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">24h</div>
                      <div className="text-sm text-gray-400">Avg Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">98%</div>
                      <div className="text-sm text-gray-400">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-purple-500/20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Swords className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SPIRIT ESPORTS
              </span>
            </div>
            <p className="text-gray-400">&copy; 2025 Spirit Esports. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}