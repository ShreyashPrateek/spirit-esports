import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Upload, Eye, EyeOff, GamepadIcon } from 'lucide-react';
import Header from './Header';
import { supabase } from '../supabaseClient';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profilePicture: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Phone number validation for Indian numbers
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }));
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setError(''); // Clear any previous errors
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Upload profile picture if provided
      let profilePictureUrl = null;
      if (formData.profilePicture) {
        try {
          // Ensure bucket exists
          const { error: bucketError } = await supabase.storage.createBucket('profile-pictures', { public: true });
          if (bucketError && !bucketError.message.includes('already exists')) {
            console.error('Bucket creation error:', bucketError);
          }

          const fileExt = formData.profilePicture.name.split('.').pop().toLowerCase();
          const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('profile-pictures')
            .upload(fileName, formData.profilePicture);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            // Continue without profile picture instead of failing
            profilePictureUrl = null;
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('profile-pictures')
              .getPublicUrl(fileName);
            profilePictureUrl = publicUrl;
          }
        } catch (err) {
          console.error('Profile picture upload failed:', err);
          profilePictureUrl = null;
        }
      }

      // Create profile immediately
      const { error: profileError } = await supabase
        .from('profile')
        .insert({
          id: authData.user.id,
          name : formData.name,
          email: formData.email,
          phone: formData.phone,
          profile_picture: profilePictureUrl,
          created_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      alert('Account created successfully! Please check your email to verify your account.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        profilePicture: null
      });
      setPreviewImage(null);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Sign Up Form */}
        <section className="pt-24 min-h-screen flex items-center">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl border border-purple-500/20 p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30 mb-4">
                  <GamepadIcon className="w-4 h-4 mr-2" />
                  Join the Arena
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Create Account
                  </span>
                </h1>
                <p className="text-gray-400">Join thousands of gamers competing for glory</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                {/* Profile Picture Upload */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full border-2 border-purple-500/30 flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-600 hover:to-blue-600 transition-all">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Upload profile picture</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>

                  {/* The parent div now controls all styling */}
                  <div className="flex items-center w-full rounded-lg border border-gray-600 bg-gray-800/50 transition-all
                focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">

                    {/* The span is now just for text and the separator line */}
                    <span className="pl-3 pr-2 text-gray-400 border-r border-gray-600">
                      +91
                    </span>

                    {/* The input is transparent and has no border or default focus ring */}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 bg-transparent text-white pl-3 pr-4 py-3 border-0 focus:ring-0"
                      placeholder="Enter 10-digit number"
                      pattern="[6-9][0-9]{9}"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-12 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Create password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg pl-10 pr-12 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Login here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;