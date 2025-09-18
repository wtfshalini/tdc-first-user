import React, { useState } from 'react';
import { Mail, Facebook, Linkedin, Instagram, ChevronLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Simulate Google login process
    setTimeout(() => {
      setIsGoogleLoading(false);
      onLogin();
    }, 1000);
  };

  const handleEmailLogin = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }
    
    setIsEmailLoading(true);
    setEmailError('');
    // Simulate email login process
    setTimeout(() => {
      setIsEmailLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Romantic couple by the water"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col">
        {/* Header with Logo */}
        <div className="p-12 lg:p-16">
          <div className="flex items-center space-x-3">
            <img 
              src="/TDC Logo.png" 
              alt="The Date Crew" 
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-start justify-start px-12 lg:px-16 py-8">
          <div className="w-full max-w-2xl">
            {/* Welcome Section */}
            <div className="mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Welcome to <span className="text-custom-amber">The Date Crew</span>
              </h1>
              <h2 className="text-xl text-gray-600 mb-6 font-medium">
                Where the real connection begins
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We know the search can feel tiring and uncertain. That's why we connect you only with genuine, like-minded people and keep your journey positive. So when the right person shows up - you're ready.
              </p>
            </div>

            {/* Login Buttons */}
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                    emailError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-custom-amber'
                  }`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
              </div>

              {/* Email Login Button */}
              <button
                onClick={handleEmailLogin}
                disabled={isEmailLoading}
                className="w-full flex items-center justify-center space-x-3 p-4 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEmailLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {isEmailLoading ? 'Signing in...' : 'Login with Email'}
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 font-medium">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              >
                {isGoogleLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span className="font-medium text-gray-700">
                  {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-12 lg:p-16">
          <div className="space-y-3">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 bg-custom-amber rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-custom-amber rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-custom-amber rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
            
            {/* Copyright and Links */}
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <span>© 2025 The Date Crew. All Right Reserved.</span>
              </div>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors underline">
                  Terms Of Service
                </a>
                <span className="text-gray-400 mx-2">|</span>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;