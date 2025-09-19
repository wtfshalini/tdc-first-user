import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, Video, Camera, Shield, AlertCircle, Coffee, Ban, Wine, Users, Baby, X, MessageCircle, Home, Plane, UserCheck, Target } from 'lucide-react';

interface EditMagicLinkProps {
  onComplete?: () => void;
}

const EditMagicLink: React.FC<EditMagicLinkProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [currentPage, setCurrentPage] = useState<'form' | 'video-verification' | 'settings' | 'verification' | 'verification-complete'>('form');

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // After completing all 7 steps, go to Video Verification
      setCurrentPage('video-verification');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSettingsComplete = () => {
    // After Magic Link Settings, go to Verification Pending
    setCurrentPage('verification');
  };

  const handleVideoVerificationComplete = () => {
    // After video verification, go to Magic Link Settings
    setCurrentPage('settings');
  };

  const handleVerificationComplete = () => {
    // After verification, go to verification complete screen
    setCurrentPage('verification-complete');
  };

  const handleVerificationCompleteNext = () => {
    // After verification complete, redirect to dashboard
    if (onComplete) {
      onComplete();
    }
  };

  // Render different pages based on current page state
  if (currentPage === 'video-verification') {
    return <VideoVerification onComplete={handleVideoVerificationComplete} onBack={() => setCurrentStep(7)} />;
  }

  if (currentPage === 'settings') {
    return <MagicLinkSettings onComplete={handleSettingsComplete} />;
  }

  if (currentPage === 'verification') {
    return <VerificationPending onComplete={handleVerificationComplete} setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === 'verification-complete') {
    return <VerificationCompleteScreen onComplete={handleVerificationCompleteNext} />;
  }

  // Main form with 7 steps
  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-left">
            Let's begin with your basic details
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-left">
            Tell us a bit about yourself to get started.
          </p>
        </div>

        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
            {[
              { number: 1, label: 'Basic Details' },
              { number: 2, label: 'Work & Education' },
              { number: 3, label: 'Background' },
              { number: 4, label: 'Lifestyle & Personality' },
              { number: 5, label: 'Partner Preferences' },
              { number: 6, label: 'Photos' },
              { number: 7, label: 'Verification' }
            ].map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-3 ${
                    currentStep === step.number
                      ? 'bg-custom-amber'
                      : currentStep > step.number
                      ? 'bg-custom-green'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className="text-center max-w-20">
                    <span className={`text-sm font-medium leading-tight ${
                      currentStep === step.number
                        ? 'text-custom-amber'
                        : currentStep > step.number
                        ? 'text-custom-green'
                        : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                </div>
                {index < 6 && (
                  <div className="flex items-center justify-center mx-2 mt-6">
                    <svg 
                      className="w-4 h-4 text-gray-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
          {currentStep === 6 && <Step6 />}
          {currentStep === 7 && <Step7 />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              <Check className="w-4 h-4" />
              <span>Save</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Placeholder step components - you can guide me on what each should contain
const Step1: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    height: '',
    gender: '',
    linkedinUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    currentCountry: '',
    hometownCountry: '',
    currentCity: '',
    hometown: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'India', 'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia',
    'Brazil', 'Argentina', 'Mexico', 'South Africa', 'Egypt', 'Nigeria'
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'Toronto', 'Vancouver', 'Montreal', 'London', 'Manchester', 'Birmingham',
    'Sydney', 'Melbourne', 'Brisbane', 'Berlin', 'Munich', 'Hamburg',
    'Paris', 'Lyon', 'Marseille', 'Rome', 'Milan', 'Naples',
    'Madrid', 'Barcelona', 'Valencia', 'Amsterdam', 'Rotterdam', 'The Hague',
    'Stockholm', 'Gothenburg', 'Oslo', 'Copenhagen', 'Mumbai', 'Delhi',
    'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Tokyo', 'Osaka',
    'Seoul', 'Singapore', 'Kuala Lumpur', 'São Paulo', 'Rio de Janeiro',
    'Buenos Aires', 'Mexico City', 'Cape Town', 'Johannesburg', 'Cairo'
  ];

  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      {/* Date of Birth and Height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (in cm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
            placeholder="Enter your height"
            min="120"
            max="250"
            required
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-4 h-4 text-custom-amber focus:ring-custom-amber border-gray-300"
            />
            <span className="ml-3 text-gray-900 font-medium">Male</span>
          </label>
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-4 h-4 text-custom-amber focus:ring-custom-amber border-gray-300"
            />
            <span className="ml-3 text-gray-900 font-medium">Female</span>
          </label>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Social Media Profiles</h3>
        
        {/* LinkedIn and Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your LinkedIn ID Link
            </label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              placeholder="Enter your LinkedIn profile URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Instagram Id Link
            </label>
            <input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              placeholder="Enter your Instagram profile URL"
            />
          </div>
        </div>

        {/* Twitter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your X (Twitter) Id Link
            </label>
            <input
              type="url"
              value={formData.twitterUrl}
              onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              placeholder="Enter your Twitter profile URL"
            />
          </div>
          <div></div>
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Location Information</h3>
        
        {/* Current Country and Hometown Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Country <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.currentCountry}
              onChange={(e) => handleInputChange('currentCountry', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              required
            >
              <option value="">Pick your current country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hometown Country <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.hometownCountry}
              onChange={(e) => handleInputChange('hometownCountry', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              required
            >
              <option value="">Pick your hometown country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Current City and Hometown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current City <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.currentCity}
              onChange={(e) => handleInputChange('currentCity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              required
            >
              <option value="">Pick your current city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hometown <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.hometown}
              onChange={(e) => handleInputChange('hometown', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              required
            >
              <option value="">Pick your hometown</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step2: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 2</h2>
      <p className="text-gray-600">Please guide me on what should be included in this step.</p>
    </div>
  );
};

const Step3: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 3</h2>
      <p className="text-gray-600">This is where the language dropdown will be. Please guide me on the complete structure for this step.</p>
    </div>
  );
};

const Step4: React.FC = () => {
  const drinkingOptions = ['Never', 'Socially', 'Regularly', 'Occasionally'];
  const smokingOptions = ['Doesn\'t Smoke', 'Smoker', 'Smokes Occasionally', 'Vaping Only', 'Trying to Quit'];
  const childrenOptions = ['Want Children', 'Don\'t Want Children', 'Open to Discussion', 'Already Have Children'];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 4</h2>
      <p className="text-gray-600">Please guide me on what should be included in this step.</p>
    </div>
  );
};

const Step5: React.FC = () => {
  const [drinkingPreference, setDrinkingPreference] = useState('');
  const [partnerSmokingPreference, setPartnerSmokingPreference] = useState('');
  const [viewsOnChildren, setViewsOnChildren] = useState('');
  const [openToPets, setOpenToPets] = useState('');
  const [willingnessToRelocate, setWillingnessToRelocate] = useState('');
  const [stayingWithParents, setStayingWithParents] = useState('');
  const [minimumIncome, setMinimumIncome] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(60);

  return (
    <div className="space-y-8">
        {/* Drinking Preference */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            What should be your partner's drinking preference? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setDrinkingPreference('drinks-regularly')}
              className={`p-4 border rounded-lg text-left transition-all ${
                drinkingPreference === 'drinks-regularly'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Coffee className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Drinks Regularly</span>
              </div>
            </button>
            <button
              onClick={() => setDrinkingPreference('teetotaller')}
              className={`p-4 border rounded-lg text-left transition-all ${
                drinkingPreference === 'teetotaller'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Ban className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Teetotaller</span>
              </div>
            </button>
            <button
              onClick={() => setDrinkingPreference('drinks-occasionally')}
              className={`p-4 border rounded-lg text-left transition-all ${
                drinkingPreference === 'drinks-occasionally'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Wine className="w-5 h-5 text-custom-amber" />
                <div>
                  <div className="font-medium text-gray-900">Drinks</div>
                  <div className="font-medium text-gray-900">Occasionally</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setDrinkingPreference('drinks-socially')}
              className={`p-4 border rounded-lg text-left transition-all ${
                drinkingPreference === 'drinks-socially'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Drinks Socially</span>
              </div>
            </button>
          </div>
        </div>

        {/* Views on Having Children */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            What is your preference about having children? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setViewsOnChildren('yes-want-children')}
              className={`p-4 border rounded-lg text-left transition-all ${
                viewsOnChildren === 'yes-want-children'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Baby className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Yes, I want children</span>
              </div>
            </button>
            <button
              onClick={() => setViewsOnChildren('no-dont-want-children')}
              className={`p-4 border rounded-lg text-left transition-all ${
                viewsOnChildren === 'no-dont-want-children'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <X className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">No, I do not want children</span>
              </div>
            </button>
            <button
              onClick={() => setViewsOnChildren('open-to-discussion')}
              className={`p-4 border rounded-lg text-left transition-all ${
                viewsOnChildren === 'open-to-discussion'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Open to discussion</span>
              </div>
            </button>
          </div>
        </div>

        {/* Open to Pets */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Do you see yourself having pets in the future?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setOpenToPets('yes')}
              className={`p-4 border rounded-lg text-left transition-all ${
                openToPets === 'yes'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Yes</span>
              </div>
            </button>
            <button
              onClick={() => setOpenToPets('no')}
              className={`p-4 border rounded-lg text-left transition-all ${
                openToPets === 'no'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <X className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">No</span>
              </div>
            </button>
            <button
              onClick={() => setOpenToPets('open-to-discussion')}
              className={`p-4 border rounded-lg text-left transition-all ${
                openToPets === 'open-to-discussion'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Open to discussion</span>
              </div>
            </button>
          </div>
        </div>

        {/* Willingness to Relocate */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Will you be willing to relocate for your partner?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setWillingnessToRelocate('yes')}
              className={`p-4 border rounded-lg text-left transition-all ${
                willingnessToRelocate === 'yes'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Plane className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Yes</span>
              </div>
            </button>
            <button
              onClick={() => setWillingnessToRelocate('no')}
              className={`p-4 border rounded-lg text-left transition-all ${
                willingnessToRelocate === 'no'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">No</span>
              </div>
            </button>
            <button
              onClick={() => setWillingnessToRelocate('open-to-discussion')}
              className={`p-4 border rounded-lg text-left transition-all ${
                willingnessToRelocate === 'open-to-discussion'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Open to discussion</span>
              </div>
            </button>
          </div>
        </div>

        {/* Preference on Staying with Parents */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            What is your Preference on Staying with Parents after marriage?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setStayingWithParents('yes')}
              className={`p-4 border rounded-lg text-left transition-all ${
                stayingWithParents === 'yes'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <UserCheck className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Yes</span>
              </div>
            </button>
            <button
              onClick={() => setStayingWithParents('no')}
              className={`p-4 border rounded-lg text-left transition-all ${
                stayingWithParents === 'no'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">No</span>
              </div>
            </button>
            <button
              onClick={() => setStayingWithParents('open-to-discussion')}
              className={`p-4 border rounded-lg text-left transition-all ${
                stayingWithParents === 'open-to-discussion'
                  ? 'border-custom-amber bg-amber-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-custom-amber" />
                <span className="font-medium text-gray-900">Open to discussion</span>
              </div>
            </button>
          </div>
        </div>

        {/* Income and Height Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Enter minimum annual income (LPA) expected in a partner. <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={minimumIncome}
              onChange={(e) => setMinimumIncome(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent text-gray-500"
              placeholder="Enter minimum income in LPA"
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Enter minimum preferred height (in cm) expected in a partner. <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={minHeight}
              onChange={(e) => setMinHeight(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent text-gray-500"
              placeholder="Enter minimum height in cm"
              min="120"
              max="250"
              required
            />
          </div>
        </div>

        {/* Age Range Preference */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Select minimum and maximum preferred age. <span className="text-red-500">*</span>
          </label>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-custom-green text-white px-3 py-1 rounded text-sm font-medium">
                  {minAge} years
                </div>
                <div className="bg-custom-green text-white px-3 py-1 rounded text-sm font-medium">
                  {maxAge} years
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-2 bg-custom-amber rounded-full"
                  style={{
                    left: `${((minAge - 21) / (60 - 21)) * 100}%`,
                    width: `${((maxAge - minAge) / (60 - 21)) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min={21}
                  max={60}
                  value={minAge}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value <= maxAge) {
                      setMinAge(value);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
                  style={{ zIndex: 2 }}
                />
                <input
                  type="range"
                  min={21}
                  max={60}
                  value={maxAge}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= minAge) {
                      setMaxAge(value);
                    }
                  }}
                  className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
                  style={{ zIndex: 2 }}
                />
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-custom-amber rounded-full cursor-pointer"
                  style={{
                    left: `calc(${((minAge - 21) / (60 - 21)) * 100}% - 8px)`,
                    top: '-6px'
                  }}
                />
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-custom-amber rounded-full cursor-pointer"
                  style={{
                    left: `calc(${((maxAge - 21) / (60 - 21)) * 100}% - 8px)`,
                    top: '-6px'
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>21</span>
                <span>60</span>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-custom-amber font-medium">
                Selected Age Range: {minAge} - {maxAge} years
              </span>
            </div>
          </div>
        </div>
    </div>
  );
};

const Step6: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 6</h2>
      <p className="text-gray-600">Please guide me on what should be included in this step.</p>
    </div>
  );
};

const Step7: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 7</h2>
      <p className="text-gray-600">Please guide me on what should be included in this step.</p>
    </div>
  );
};

// Video Verification Page
interface VideoVerificationProps {
  onComplete: () => void;
  onBack: () => void;
}

const VideoVerification: React.FC<VideoVerificationProps> = ({ onComplete, onBack }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
    }, 3000);
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-left">
            Video Verification
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-left">
            This step ensures the authenticity and security of matchmaking profiles by verifying your identity through a short video recording.
          </p>
        </div>

        {/* Video Verification Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8">
          {/* Video Recording Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
            {!hasRecorded ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-10 h-10 text-gray-400" />
                </div>
                {!isRecording ? (
                  <>
                    <p className="text-gray-600 text-lg">Click the button below to start recording</p>
                    <button
                      onClick={handleStartRecording}
                      className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-3 mx-auto text-lg"
                    >
                      <Video className="w-6 h-6" />
                      <span>Start Recording</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-600 font-medium text-lg">Recording in progress...</span>
                    </div>
                    <p className="text-gray-600">Please speak clearly and state your name and today's date</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-600 font-medium text-lg">Recording completed successfully!</p>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="px-8 py-4 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium flex items-center space-x-3 mx-auto text-lg disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-6 h-6" />
                      <span>Upload Video</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMagicLink;

// SelectionCard Component
interface SelectionCardProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  selected: boolean;
  onSelect: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ id, title, icon: Icon, iconColor, selected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-custom-amber bg-amber-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex flex-col items-center space-y-3">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <span className={`text-sm font-medium text-center ${
          selected ? 'text-custom-amber' : 'text-gray-700'
        }`}>
          {title}
        </span>
      </div>
    </div>
  );
};

// DualRangeSlider Component
interface DualRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  label: string;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({ min, max, minValue, maxValue, onChange, label }) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= maxValue) {
      onChange(value, maxValue);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= minValue) {
      onChange(minValue, value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {minValue} {label}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {maxValue} {label}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{min} {label}</span>
        <span>{max} {label}</span>
      </div>
    </div>
  );
};