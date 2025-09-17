import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Camera, 
  Upload, 
  ChevronLeft, 
  ChevronRight,
  Save,
  Check,
  AlertCircle,
  FileText,
  CreditCard,
  Video,
  Building,
  DollarSign,
  Users,
  Globe,
  Clock,
  Target,
  Star,
  Coffee,
  Music,
  Book,
  Plane,
  Dumbbell,
  Palette,
  GameController2,
  Utensils,
  Film,
  Mountain,
  Camera as CameraIcon,
  Headphones,
  Bike,
  TreePine,
  Waves,
  Sun,
  Moon,
  Zap,
  Flower,
  Sparkles
} from 'lucide-react';

interface EditMagicLinkProps {
  onComplete?: () => void;
}

const EditMagicLink: React.FC<EditMagicLinkProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    currentCity: '',
    hometown: '',
    // Step 2 - Education & Professional
    step2: {
      undergraduateCollege: '',
      undergraduateDegree: '',
      postgraduateCollege: '',
      postgraduateDegree: '',
      professionalStatus: '',
      // Professional fields (conditional based on status)
      companyName: '',
      jobTitle: '',
      workExperience: '',
      industry: '',
      annualIncome: '',
      businessName: '',
      businessType: '',
      businessExperience: '',
      businessIncome: '',
      freelanceServices: '',
      freelanceExperience: '',
      freelanceIncome: '',
      unemploymentReason: '',
      jobSearchStatus: '',
      lastJobTitle: '',
      retirementAge: '',
      retirementIncome: '',
      previousCareer: '',
      studentInstitution: '',
      studyField: '',
      expectedGraduation: '',
      partTimeWork: ''
    },
    // Step 3 - Personal Details
    step3: {
      height: '',
      bodyType: '',
      smokingHabits: '',
      drinkingHabits: '',
      dietaryPreferences: '',
      exerciseFrequency: '',
      relationshipHistory: '',
      hasChildren: '',
      wantsChildren: '',
      religiousBeliefs: '',
      politicalViews: '',
      languages: []
    },
    // Step 4 - Lifestyle & Interests
    step4: {
      hobbies: [],
      musicPreferences: [],
      movieGenres: [],
      travelFrequency: '',
      favoriteDestinations: [],
      socialMediaUsage: '',
      weekendActivities: [],
      personalityType: '',
      communicationStyle: '',
      conflictResolution: ''
    },
    // Step 5 - Partner Preferences
    step5: {
      ageRangeMin: '',
      ageRangeMax: '',
      preferredLocation: '',
      educationPreference: '',
      professionPreference: '',
      incomePreference: '',
      heightPreference: '',
      bodyTypePreference: '',
      smokingPreference: '',
      drinkingPreference: '',
      religionPreference: '',
      childrenPreference: '',
      dealBreakers: []
    },
    // Step 6 - About Me & Photos
    step6: {
      aboutMe: '',
      lookingFor: '',
      perfectDate: '',
      lifeGoals: '',
      photos: [],
      profilePhoto: null
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 6;

  const handleInputChange = (field: string, value: any, step?: string) => {
    setFormData(prev => {
      if (step) {
        return {
          ...prev,
          [step]: {
            ...prev[step as keyof typeof prev],
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.currentCity.trim()) newErrors.currentCity = 'Current city is required';
        break;
      case 2:
        if (!formData.step2.undergraduateCollege.trim()) newErrors.undergraduateCollege = 'Undergraduate college is required';
        if (!formData.step2.undergraduateDegree.trim()) newErrors.undergraduateDegree = 'Undergraduate degree is required';
        if (!formData.step2.professionalStatus) newErrors.professionalStatus = 'Professional status is required';
        
        // Validate conditional fields based on professional status
        if (formData.step2.professionalStatus === 'employed') {
          if (!formData.step2.companyName.trim()) newErrors.companyName = 'Company name is required';
          if (!formData.step2.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
          if (!formData.step2.workExperience) newErrors.workExperience = 'Work experience is required';
          if (!formData.step2.industry) newErrors.industry = 'Industry is required';
          if (!formData.step2.annualIncome) newErrors.annualIncome = 'Annual income is required';
        } else if (formData.step2.professionalStatus === 'business-owner') {
          if (!formData.step2.businessName.trim()) newErrors.businessName = 'Business name is required';
          if (!formData.step2.businessType) newErrors.businessType = 'Business type is required';
          if (!formData.step2.businessExperience) newErrors.businessExperience = 'Business experience is required';
          if (!formData.step2.businessIncome) newErrors.businessIncome = 'Business income is required';
        } else if (formData.step2.professionalStatus === 'freelancer') {
          if (!formData.step2.freelanceServices.trim()) newErrors.freelanceServices = 'Freelance services are required';
          if (!formData.step2.freelanceExperience) newErrors.freelanceExperience = 'Freelance experience is required';
          if (!formData.step2.freelanceIncome) newErrors.freelanceIncome = 'Freelance income is required';
        } else if (formData.step2.professionalStatus === 'unemployed') {
          if (!formData.step2.unemploymentReason.trim()) newErrors.unemploymentReason = 'Unemployment reason is required';
          if (!formData.step2.jobSearchStatus) newErrors.jobSearchStatus = 'Job search status is required';
        } else if (formData.step2.professionalStatus === 'retired') {
          if (!formData.step2.retirementAge) newErrors.retirementAge = 'Retirement age is required';
          if (!formData.step2.previousCareer.trim()) newErrors.previousCareer = 'Previous career is required';
        } else if (formData.step2.professionalStatus === 'student') {
          if (!formData.step2.studentInstitution.trim()) newErrors.studentInstitution = 'Institution is required';
          if (!formData.step2.studyField.trim()) newErrors.studyField = 'Field of study is required';
          if (!formData.step2.expectedGraduation) newErrors.expectedGraduation = 'Expected graduation is required';
        }
        break;
      // Add validation for other steps as needed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step < currentStep
                  ? 'bg-custom-green text-white'
                  : step === currentStep
                  ? 'bg-custom-amber text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < totalSteps && (
              <div
                className={`w-12 h-1 mx-2 ${
                  step < currentStep ? 'bg-custom-green' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} onChange={handleInputChange} errors={errors} />;
      case 2:
        return <Step2 formData={formData} onChange={handleInputChange} errors={errors} />;
      case 3:
        return <Step3 formData={formData} onChange={handleInputChange} errors={errors} />;
      case 4:
        return <Step4 formData={formData} onChange={handleInputChange} errors={errors} />;
      case 5:
        return <Step5 formData={formData} onChange={handleInputChange} errors={errors} />;
      case 6:
        return <Step6 formData={formData} onChange={handleInputChange} errors={errors} />;
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl p-8 text-center max-w-md w-full shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your Magic Link profile has been submitted for review. Our team will verify your details and activate your profile soon.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Your Magic Link Profile</h1>
          <p className="text-sm sm:text-base text-gray-600">Complete all steps to create your personalized dating profile</p>
        </div>

        {renderStepIndicator()}

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          {renderStep()}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-custom-green text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Submit Profile</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-4 py-2 bg-custom-amber text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 1 Component
const Step1: React.FC<{
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}> = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
        <p className="text-gray-600 mb-6">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
              placeholder="Enter your first name"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange('dateOfBirth', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.dateOfBirth ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
              errors.gender ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
            }`}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.gender}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current City *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.currentCity}
              onChange={(e) => onChange('currentCity', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.currentCity ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
              placeholder="Enter your current city"
            />
          </div>
          {errors.currentCity && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.currentCity}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hometown
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.hometown}
              onChange={(e) => onChange('hometown', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              placeholder="Enter your hometown"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 2 Component
const Step2: React.FC<{
  formData: any;
  onChange: (field: string, value: any, step?: string) => void;
  errors: Record<string, string>;
}> = ({ formData, onChange, errors }) => {
  const professionalStatus = formData.step2.professionalStatus;

  const renderProfessionalFields = () => {
    switch (professionalStatus) {
      case 'employed':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.step2.companyName}
                  onChange={(e) => onChange('companyName', e.target.value, 'step2')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.companyName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                  }`}
                  placeholder="Enter your company name"
                />
              </div>
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.step2.jobTitle}
                  onChange={(e) => onChange('jobTitle', e.target.value, 'step2')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.jobTitle ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                  }`}
                  placeholder="Enter your job title"
                />
              </div>
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.jobTitle}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience *
              </label>
              <select
                value={formData.step2.workExperience}
                onChange={(e) => onChange('workExperience', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.workExperience ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.workExperience && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.workExperience}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <select
                value={formData.step2.industry}
                onChange={(e) => onChange('industry', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.industry ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="marketing">Marketing</option>
                <option value="consulting">Consulting</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="other">Other</option>
              </select>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.industry}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income *
              </label>
              <select
                value={formData.step2.annualIncome}
                onChange={(e) => onChange('annualIncome', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.annualIncome ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select income range</option>
                <option value="0-3">₹0 - ₹3 LPA</option>
                <option value="3-5">₹3 - ₹5 LPA</option>
                <option value="5-10">₹5 - ₹10 LPA</option>
                <option value="10-15">₹10 - ₹15 LPA</option>
                <option value="15-25">₹15 - ₹25 LPA</option>
                <option value="25-50">₹25 - ₹50 LPA</option>
                <option value="50+">₹50+ LPA</option>
              </select>
              {errors.annualIncome && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.annualIncome}
                </p>
              )}
            </div>
          </div>
        );

      case 'business-owner':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.step2.businessName}
                  onChange={(e) => onChange('businessName', e.target.value, 'step2')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.businessName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                  }`}
                  placeholder="Enter your business name"
                />
              </div>
              {errors.businessName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                value={formData.step2.businessType}
                onChange={(e) => onChange('businessType', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.businessType ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select business type</option>
                <option value="sole-proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="private-limited">Private Limited</option>
                <option value="public-limited">Public Limited</option>
                <option value="llp">LLP</option>
                <option value="other">Other</option>
              </select>
              {errors.businessType && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Experience *
              </label>
              <select
                value={formData.step2.businessExperience}
                onChange={(e) => onChange('businessExperience', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.businessExperience ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.businessExperience && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessExperience}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Income *
              </label>
              <select
                value={formData.step2.businessIncome}
                onChange={(e) => onChange('businessIncome', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.businessIncome ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select income range</option>
                <option value="0-5">₹0 - ₹5 LPA</option>
                <option value="5-10">₹5 - ₹10 LPA</option>
                <option value="10-25">₹10 - ₹25 LPA</option>
                <option value="25-50">₹25 - ₹50 LPA</option>
                <option value="50-100">₹50 - ₹100 LPA</option>
                <option value="100+">₹100+ LPA</option>
              </select>
              {errors.businessIncome && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.businessIncome}
                </p>
              )}
            </div>
          </div>
        );

      case 'freelancer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Freelance Services *
              </label>
              <textarea
                value={formData.step2.freelanceServices}
                onChange={(e) => onChange('freelanceServices', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.freelanceServices ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
                placeholder="Describe the services you offer"
                rows={3}
              />
              {errors.freelanceServices && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.freelanceServices}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Freelance Experience *
              </label>
              <select
                value={formData.step2.freelanceExperience}
                onChange={(e) => onChange('freelanceExperience', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.freelanceExperience ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.freelanceExperience && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.freelanceExperience}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Freelance Income *
              </label>
              <select
                value={formData.step2.freelanceIncome}
                onChange={(e) => onChange('freelanceIncome', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.freelanceIncome ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select income range</option>
                <option value="0-3">₹0 - ₹3 LPA</option>
                <option value="3-5">₹3 - ₹5 LPA</option>
                <option value="5-10">₹5 - ₹10 LPA</option>
                <option value="10-15">₹10 - ₹15 LPA</option>
                <option value="15-25">₹15 - ₹25 LPA</option>
                <option value="25+">₹25+ LPA</option>
              </select>
              {errors.freelanceIncome && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.freelanceIncome}
                </p>
              )}
            </div>
          </div>
        );

      case 'unemployed':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Unemployment *
              </label>
              <textarea
                value={formData.step2.unemploymentReason}
                onChange={(e) => onChange('unemploymentReason', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.unemploymentReason ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
                placeholder="Please explain your current situation"
                rows={3}
              />
              {errors.unemploymentReason && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.unemploymentReason}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Search Status *
              </label>
              <select
                value={formData.step2.jobSearchStatus}
                onChange={(e) => onChange('jobSearchStatus', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.jobSearchStatus ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              >
                <option value="">Select status</option>
                <option value="actively-searching">Actively Searching</option>
                <option value="casually-looking">Casually Looking</option>
                <option value="not-looking">Not Currently Looking</option>
                <option value="taking-break">Taking a Break</option>
              </select>
              {errors.jobSearchStatus && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.jobSearchStatus}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Job Title
              </label>
              <input
                type="text"
                value={formData.step2.lastJobTitle}
                onChange={(e) => onChange('lastJobTitle', e.target.value, 'step2')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                placeholder="Enter your last job title"
              />
            </div>
          </div>
        );

      case 'retired':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Age *
              </label>
              <input
                type="number"
                value={formData.step2.retirementAge}
                onChange={(e) => onChange('retirementAge', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.retirementAge ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
                placeholder="Enter retirement age"
                min="50"
                max="80"
              />
              {errors.retirementAge && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.retirementAge}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Income
              </label>
              <select
                value={formData.step2.retirementIncome}
                onChange={(e) => onChange('retirementIncome', e.target.value, 'step2')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              >
                <option value="">Select income range</option>
                <option value="0-2">₹0 - ₹2 LPA</option>
                <option value="2-5">₹2 - ₹5 LPA</option>
                <option value="5-10">₹5 - ₹10 LPA</option>
                <option value="10-15">₹10 - ₹15 LPA</option>
                <option value="15+">₹15+ LPA</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Career *
              </label>
              <textarea
                value={formData.step2.previousCareer}
                onChange={(e) => onChange('previousCareer', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.previousCareer ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
                placeholder="Describe your previous career"
                rows={3}
              />
              {errors.previousCareer && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.previousCareer}
                </p>
              )}
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.step2.studentInstitution}
                  onChange={(e) => onChange('studentInstitution', e.target.value, 'step2')}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors.studentInstitution ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                  }`}
                  placeholder="Enter your institution name"
                />
              </div>
              {errors.studentInstitution && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.studentInstitution}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                value={formData.step2.studyField}
                onChange={(e) => onChange('studyField', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.studyField ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
                placeholder="Enter your field of study"
              />
              {errors.studyField && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.studyField}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Graduation *
              </label>
              <input
                type="date"
                value={formData.step2.expectedGraduation}
                onChange={(e) => onChange('expectedGraduation', e.target.value, 'step2')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.expectedGraduation ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
              />
              {errors.expectedGraduation && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.expectedGraduation}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Part-time Work
              </label>
              <input
                type="text"
                value={formData.step2.partTimeWork}
                onChange={(e) => onChange('partTimeWork', e.target.value, 'step2')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                placeholder="Any part-time work or internships"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Education & Professional Details</h2>
        <p className="text-gray-600 mb-6">Tell us about your educational background and professional status</p>
      </div>

      {/* Education Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Undergraduate College *
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.step2.undergraduateCollege}
                onChange={(e) => onChange('undergraduateCollege', e.target.value, 'step2')}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                  errors.undergraduateCollege ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
                }`}
                placeholder="Enter your undergraduate college"
              />
            </div>
            {errors.undergraduateCollege && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.undergraduateCollege}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Undergraduate Degree *
            </label>
            <input
              type="text"
              value={formData.step2.undergraduateDegree}
              onChange={(e) => onChange('undergraduateDegree', e.target.value, 'step2')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.undergraduateDegree ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
              }`}
              placeholder="e.g., B.Tech, B.Com, BA, etc."
            />
            {errors.undergraduateDegree && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.undergraduateDegree}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postgraduate College
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.step2.postgraduateCollege}
                onChange={(e) => onChange('postgraduateCollege', e.target.value, 'step2')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
                placeholder="Enter your postgraduate college (if any)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postgraduate Degree
            </label>
            <input
              type="text"
              value={formData.step2.postgraduateDegree}
              onChange={(e) => onChange('postgraduateDegree', e.target.value, 'step2')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent"
              placeholder="e.g., MBA, M.Tech, MA, etc."
            />
          </div>
        </div>
      </div>

      {/* Professional Status Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Professional Status</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Professional Status *
          </label>
          <select
            value={formData.step2.professionalStatus}
            onChange={(e) => onChange('professionalStatus', e.target.value, 'step2')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
              errors.professionalStatus ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-custom-amber'
            }`}
          >
            <option value="">Select your professional status</option>
            <option value="employed">Employed</option>
            <option value="business-owner">Business Owner</option>
            <option value="freelancer">Freelancer</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
            <option value="student">Student</option>
          </select>
          {errors.professionalStatus && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.professionalStatus}
            </p>
          )}
        </div>

        {/* Conditional Professional Fields */}
        {professionalStatus && (
          <div className="mt-6">
            {renderProfessionalFields()}
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder components for other steps
const Step3: React.FC<{
  formData: any;
  onChange: (field: string, value: any, step?: string) => void;
  errors: Record<string, string>;
}> = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Details</h2>
        <p className="text-gray-600 mb-6">Share more about yourself</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500">Step 3 content will be implemented here</p>
      </div>
    </div>
  );
};

const Step4: React.FC<{
  formData: any;
  onChange: (field: string, value: any, step?: string) => void;
  errors: Record<string, string>;
}> = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Lifestyle & Interests</h2>
        <p className="text-gray-600 mb-6">Tell us about your hobbies and lifestyle</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500">Step 4 content will be implemented here</p>
      </div>
    </div>
  );
};

const Step5: React.FC<{
  formData: any;
  onChange: (field: string, value: any, step?: string) => void;
  errors: Record<string, string>;
}> = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Partner Preferences</h2>
        <p className="text-gray-600 mb-6">What are you looking for in a partner?</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500">Step 5 content will be implemented here</p>
      </div>
    </div>
  );
};

const Step6: React.FC<{
  formData: any;
  onChange: (field: string, value: any, step?: string) => void;
  errors: Record<string, string>;
}> = ({ formData, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me & Photos</h2>
        <p className="text-gray-600 mb-6">Complete your profile with photos and description</p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-500">Step 6 content will be implemented here</p>
      </div>
    </div>
  );
};

export default EditMagicLink;