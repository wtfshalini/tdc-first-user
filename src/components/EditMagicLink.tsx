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
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 4</h2>
      <p className="text-gray-600">Please guide me on what should be included in this step.</p>
    </div>
  );
};

const Step5: React.FC = () => {
  const [drinkingPreference, setDrinkingPreference] = useState('');
  const [viewsOnChildren, setViewsOnChildren] = useState('');
  const [openToPets, setOpenToPets] = useState('');
  const [willingnessToRelocate, setWillingnessToRelocate] = useState('');
  const [stayingWithParents, setStayingWithParents] = useState('');
  const [minimumIncome, setMinimumIncome] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(50);

  return (
    <div>
      <div className="space-y-6">
        {/* Drinking Preference */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            What should be your partner's drinking preference? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectionCard
              id="drinks-regularly"
              title="Drinks Regularly"
              icon={Coffee}
              iconColor="text-custom-amber"
              selected={drinkingPreference === 'drinks-regularly'}
              onSelect={() => setDrinkingPreference('drinks-regularly')}
            />
            <SelectionCard
              id="teetotaller"
              title="Teetotaller"
              icon={Ban}
              iconColor="text-custom-amber"
              selected={drinkingPreference === 'teetotaller'}
              onSelect={() => setDrinkingPreference('teetotaller')}
            />
            <SelectionCard
              id="drinks-occasionally"
              title="Drinks Occasionally"
              icon={Wine}
              iconColor="text-custom-amber"
              selected={drinkingPreference === 'drinks-occasionally'}
              onSelect={() => setDrinkingPreference('drinks-occasionally')}
            />
            <SelectionCard
              id="drinks-socially"
              title="Drinks Socially"
              icon={Users}
              iconColor="text-custom-amber"
              selected={drinkingPreference === 'drinks-socially'}
              onSelect={() => setDrinkingPreference('drinks-socially')}
            />
          </div>
        </div>

        {/* Views on Having Children */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-2">
            What is your preference about having children? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectionCard
              id="yes-want-children"
              title="Yes, I want children"
              icon={Baby}
              iconColor="text-custom-amber"
              selected={viewsOnChildren === 'yes-want-children'}
              onSelect={() => setViewsOnChildren('yes-want-children')}
            />
            <SelectionCard
              id="no-dont-want-children"
              title="No, I do not want children"
              icon={X}
              iconColor="text-custom-amber"
              selected={viewsOnChildren === 'no-dont-want-children'}
              onSelect={() => setViewsOnChildren('no-dont-want-children')}
            />
            <SelectionCard
              id="open-to-discussion-children"
              title="Open to discussion"
              icon={MessageCircle}
              iconColor="text-custom-amber"
              selected={viewsOnChildren === 'open-to-discussion'}
              onSelect={() => setViewsOnChildren('open-to-discussion')}
            />
          </div>
        </div>

        {/* Open to Pets */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Do you see yourself having pets in the future?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectionCard
              id="pets-yes"
              title="Yes"
              icon={Check}
              iconColor="text-custom-amber"
              selected={openToPets === 'yes'}
              onSelect={() => setOpenToPets('yes')}
            />
            <SelectionCard
              id="pets-no"
              title="No"
              icon={X}
              iconColor="text-custom-amber"
              selected={openToPets === 'no'}
              onSelect={() => setOpenToPets('no')}
            />
            <SelectionCard
              id="pets-open-to-discussion"
              title="Open to discussion"
              icon={MessageCircle}
              iconColor="text-custom-amber"
              selected={openToPets === 'open-to-discussion'}
              onSelect={() => setOpenToPets('open-to-discussion')}
            />
          </div>
        </div>

        {/* Willingness to Relocate */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Will you be willing to relocate for your partner?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectionCard
              id="relocate-yes"
              title="Yes"
              icon={Plane}
              iconColor="text-custom-amber"
              selected={willingnessToRelocate === 'yes'}
              onSelect={() => setWillingnessToRelocate('yes')}
            />
            <SelectionCard
              id="relocate-no"
              title="No"
              icon={Home}
              iconColor="text-custom-amber"
              selected={willingnessToRelocate === 'no'}
              onSelect={() => setWillingnessToRelocate('no')}
            />
            <SelectionCard
              id="relocate-open-to-discussion"
              title="Open to discussion"
              icon={MessageCircle}
              iconColor="text-custom-amber"
              selected={willingnessToRelocate === 'open-to-discussion'}
              onSelect={() => setWillingnessToRelocate('open-to-discussion')}
            />
          </div>
        </div>

        {/* Preference on Staying with Parents */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            What is your Preference on Staying with Parents after marriage?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectionCard
              id="parents-yes"
              title="Yes"
              icon={UserCheck}
              iconColor="text-custom-amber"
              selected={stayingWithParents === 'yes'}
              onSelect={() => setStayingWithParents('yes')}
            />
            <SelectionCard
              id="parents-no"
              title="No"
              icon={Home}
              iconColor="text-custom-amber"
              selected={stayingWithParents === 'no'}
              onSelect={() => setStayingWithParents('no')}
            />
            <SelectionCard
              id="parents-open-to-discussion"
              title="Open to discussion"
              icon={MessageCircle}
              iconColor="text-custom-amber"
              selected={stayingWithParents === 'open-to-discussion'}
              onSelect={() => setStayingWithParents('open-to-discussion')}
            />
          </div>
        </div>

        {/* Minimum Income Preference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Minimum Income Preference */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Enter minimum annual income (LPA) expected in a partner. <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={minimumIncome}
              onChange={(e) => setMinimumIncome(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              placeholder="Enter minimum income in LPA"
              min="0"
              step="0.1"
              required
            />
          </div>

          {/* Minimum Height Preference */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Enter minimum preferred height (in cm) expected in a partner. <span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="number"
                value={minHeight}
                onChange={(e) => setMinHeight(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                placeholder="Enter minimum height in cm"
                min="120"
                max="250"
                required
              />
            </div>
          </div>
        </div>

        {/* Age Range Preference */}
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-2">
            Select minimum and maximum preferred age. <span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <DualRangeSlider
              min={21}
              max={50}
              minValue={minAge}
              maxValue={maxAge}
              onChange={(min, max) => {
                setMinAge(min);
                setMaxAge(max);
              }}
              label="years"
            />
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
                <p className="text-green-600 font-medium">Video recorded successfully!</p>
                <p className="text-gray-600">Your verification video is ready to upload</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setHasRecorded(false);
                      setIsRecording(false);
                    }}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Re-record
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-6 py-2 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Video'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recording Guidelines */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-amber-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Recording Guidelines
          </h3>
          <ul className="space-y-3 text-amber-800">
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Ensure good lighting and clear visibility of your face</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Speak clearly and state your full name and today's date</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Keep the video between 10-15 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1">•</span>
              <span>Make sure you're the only person in the frame</span>
            </li>
          </ul>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2 text-lg">Privacy & Security</h4>
              <p className="text-blue-800">
                Your verification video is encrypted and used solely for identity verification purposes. It will be reviewed by our team and securely deleted after verification is complete.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentPage('form');
              setCurrentStep(7);
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onComplete}
            className="flex items-center space-x-2 px-6 py-3 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Magic Link Settings Page
interface MagicLinkSettingsProps {
  onComplete: () => void;
}

const MagicLinkSettings: React.FC<MagicLinkSettingsProps> = ({ onComplete }) => {
  const [selectedPrivacy, setSelectedPrivacy] = useState<'open' | 'partial' | 'private'>('open');
  const [customSlug, setCustomSlug] = useState('your-name');

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Magic Link's Privacy
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Choose how you'd like your Magic Link to be shared
          </p>
        </div>

        <div className="space-y-8">
          {/* Privacy Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select your Magic Link's Privacy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Keep My Link Open */}
              <PrivacyCard
                id="open"
                title="Keep My Link Open"
                badge="Recommended"
                description="Share your Magic Link just like you would a biodata - but smarter."
                features={[
                  "Parents and family can view it easily.",
                  "Downloadable PDF version included.",
                  "We recommend this option if you prefer to replace your traditional biodata."
                ]}
                icon="👁️"
                selected={selectedPrivacy === 'open'}
                onSelect={() => setSelectedPrivacy('open')}
                recommended={true}
              />
              
              {/* Keep My Link Partially Private */}
              <PrivacyCard
                id="partial"
                title="Keep My Link Partially Private"
                description="For those who want balance."
                features={[
                  "Anyone with your link can see your photo and \"About Me,\" but not your name.",
                  "Only Verified TDC customers can log in to see your profile. You'll be notified when this happens.",
                  "Matches happen only with mutual acceptance, and we'll help fix the date."
                ]}
                icon="🛡️"
                selected={selectedPrivacy === 'partial'}
                onSelect={() => setSelectedPrivacy('partial')}
              />
              
              {/* Keep My Link Completely Private */}
              <PrivacyCard
                id="private"
                title="Keep My Link Completely Private"
                description="For maximum discretion."
                features={[
                  "Your profile won't be accessible through the link. No Personal Slug. No Analytics.",
                  "It will only be visible to TDC matchmakers.",
                  "If we find a potential match, we'll call you directly to take things forward."
                ]}
                icon="🔒"
                selected={selectedPrivacy === 'private'}
                onSelect={() => setSelectedPrivacy('private')}
              />
            </div>
          </div>
          
          {/* Slug Selection - Only show if not completely private */}
          {selectedPrivacy !== 'private' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Slug Selection</h2>
              <p className="text-gray-600 mb-6">
                Choose your personal profile link (e.g., thedatecrew.com/yourname).
              </p>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-gray-500 text-sm sm:text-base">findlove.thedatecrew.com/profile/</span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                  placeholder="your-name"
                />
              </div>
              
              <p className="text-xs sm:text-sm text-gray-500">
                Your profile will be accessible at: findlove.thedatecrew.com/profile/{customSlug}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => {/* Go back to form step 7 */}}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onComplete}
            className="flex items-center space-x-2 px-6 py-3 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
          >
            <span>Save Settings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Privacy Card Component
interface PrivacyCardProps {
  id: string;
  title: string;
  badge?: string;
  description: string;
  features: string[];
  icon: string;
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
}

const PrivacyCard: React.FC<PrivacyCardProps> = ({
  title,
  badge,
  description,
  features,
  icon,
  selected,
  onSelect,
  recommended
}) => {
  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
        selected
          ? 'border-custom-amber bg-amber-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${recommended ? 'ring-2 ring-custom-amber ring-opacity-20' : ''}`}
    >
      {badge && (
        <div className="absolute -top-3 left-4">
          <span className="bg-custom-amber text-white px-3 py-1 rounded-full text-xs font-medium">
            {badge}
          </span>
        </div>
      )}
      
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className={`font-semibold ${selected ? 'text-amber-900' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>
      
      <p className={`text-sm mb-4 ${selected ? 'text-amber-700' : 'text-gray-600'}`}>
        {description}
      </p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className={`text-sm flex items-start ${selected ? 'text-amber-700' : 'text-gray-600'}`}>
            <span className="mr-2 mt-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// Verification Pending Page
interface VerificationPendingProps {
  onComplete: () => void;
  setCurrentPage: (page: 'form' | 'settings' | 'verification') => void;
}

const VerificationPending: React.FC<VerificationPendingProps> = (props) => {
  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Profile Submitted Successfully! 🎉
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Thank you for sharing your details—our matchmakers will review your profile within 24–48 hours. Please keep an eye on your inbox for updates!
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-700 font-medium">
                  Your profile has been shared with our matchmakers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-700">
                  It may take 24–48 hours for us to review your details. If we need any clarification, we'll reach out to you by email—so please keep an eye on your inbox.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-gray-700">
                  You can now access your portal. All features will unlock once your profile is verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-custom-amber rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Need Help?</h3>
              <p className="text-amber-800">
                If you have any questions, just drop us a note at{' '}
                <a 
                  href="mailto:hello@thedatecrew.com" 
                  className="text-custom-amber hover:underline font-medium"
                >
                  hello@thedatecrew.com
                </a>
                {' '}and we'll get back to you.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => props.setCurrentPage('settings')}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={props.onComplete}
            className="flex items-center space-x-2 px-6 py-3 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Verification Complete Screen
interface VerificationCompleteScreenProps {
  onComplete: () => void;
}

const VerificationCompleteScreen: React.FC<VerificationCompleteScreenProps> = ({ onComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleProceed = () => {
    setShowConfetti(true);
    // Show confetti for 2 seconds before redirecting
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  ['bg-custom-amber', 'bg-custom-green', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'][
                    Math.floor(Math.random() * 5)
                  ]
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Verification Complete! 
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            You can now start sharing your magic link and access all features.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 mb-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          {/* Body Content */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-gray-700 text-lg leading-relaxed">
              Your identity has been successfully verified. Share your magic link with others and unlock the full portal experience. All features are now enabled for your account, making it easy to connect and participate securely.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleProceed}
            disabled={showConfetti}
            className={`px-8 py-4 bg-custom-green text-white rounded-lg font-medium text-lg transition-all duration-200 ${
              showConfetti 
                ? 'opacity-75 cursor-not-allowed transform scale-95' 
                : 'hover:bg-opacity-90 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {showConfetti ? 'Redirecting...' : 'Proceed to Magic Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Selection Card Component for Step 5
interface SelectionCardProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  iconColor?: string;
  selected: boolean;
  onSelect: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ title, icon: Icon, iconColor = "text-gray-600", selected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left w-full ${
        selected
          ? 'border-custom-amber bg-amber-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <span className={`font-medium ${selected ? 'text-amber-900' : 'text-gray-900'}`}>
          {title}
        </span>
      </div>
    </button>
  );
};

// Dual Range Slider Component
interface DualRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  label?: string;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
  label = ''
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100;

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = Math.round(min + (percentage / 100) * (max - min));

    if (isDragging === 'min') {
      const newMin = Math.min(value, maxValue - 1);
      onChange(newMin, maxValue);
    } else {
      const newMax = Math.max(value, minValue + 1);
      onChange(minValue, newMax);
    }
  }, [isDragging, min, max, minValue, maxValue, onChange]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  return (
    <div className="w-full">
      {/* Value Display */}
      <div className="relative mb-12">
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${minPercentage}%` }}
        >
          <div className="bg-custom-green text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg mb-2">
            {minValue} {label}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-custom-green"></div>
          </div>
        </div>
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${maxPercentage}%` }}
        >
          <div className="bg-custom-green text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-lg mb-2">
            {maxValue} {label}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-custom-green"></div>
          </div>
        </div>
      </div>

      {/* Slider Track */}
      <div 
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Active Range */}
        <div
          className="absolute h-full bg-custom-amber rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`
          }}
        />
        
        {/* Min Handle */}
        <div
          className={`absolute w-6 h-6 bg-white border-3 border-custom-amber rounded-full shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-transform hover:scale-110 ${
            isDragging === 'min' ? 'scale-125' : ''
          }`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleMouseDown('min')}
        />
        
        {/* Max Handle */}
        <div
          className={`absolute w-6 h-6 bg-white border-3 border-custom-amber rounded-full shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-transform hover:scale-110 ${
            isDragging === 'max' ? 'scale-125' : ''
          }`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>

      {/* Range Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {/* Summary */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
        <p className="text-sm text-amber-800">
          <span className="font-medium">Selected Age Range:</span> {minValue} - {maxValue} {label}
        </p>
      </div>
    </div>
  );
};

export default EditMagicLink;