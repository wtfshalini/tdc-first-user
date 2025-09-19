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
    height