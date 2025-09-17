import React from 'react';
import { FileText, CheckCircle, Heart, CreditCard, GraduationCap, FileX, Video, Facebook, Linkedin, Instagram } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const timelineSteps = [
    {
      title: "Fill out the onboarding form",
      description: "Take your time, do it when you're free and relaxed (best on a laptop).",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Profile review",
      description: "Once you submit, our matchmakers will verify your details.",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Go live with your Magic Link",
      description: "After approval, your profile will be shared with potential matches curated by our team if we find a potential match.",
      icon: Heart,
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const requiredDocuments = [
    { name: "Government ID", icon: CreditCard },
    { name: "Last drawn payslip", icon: FileText },
    { name: "College degree", icon: GraduationCap },
    { name: "Divorce papers (if applicable)", icon: FileText },
    { name: "A short video for self-verification", icon: Video }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/TDC Logo.png" 
              alt="The Date Crew" 
              className="h-8 w-auto"
            />
          </div>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome Heading */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Let's begin your journey
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            We're so happy to have you here. This is the beginning of an exciting journey to find your partner and at The Date Crew, our goal is to make this process positive, safe, and stress-free.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="mb-8 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Here's what happens next:</h2>
          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Explanation */}
        <div className="mb-8 bg-white rounded-xl p-8 shadow-sm">
          <p className="text-gray-600 mb-4">
            We know this feels like a lot, and many people ask us, <strong>"Why do you need all of this?"</strong>
          </p>
          <h3 className="text-xl font-bold text-custom-amber mb-6">
            Here's the truth: It's to protect you.
          </h3>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              The internet is full of scams and fake profiles. By collecting these details, we ensure that every person here is genuine - who they say they are, working where they claim to work, and truly real.
            </p>
            <p>
              This way, you'll only meet authentic people, and your journey will stay positive and safe. We ask for your cooperation—and in return, we promise a more meaningful experience.
            </p>
            <p className="text-lg font-medium text-gray-900 mt-8">
              Whenever you're ready, we're ready. 💛
            </p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">During onboarding, you'll be asked for:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <doc.icon className="w-4 h-4 text-custom-amber" />
                </div>
                <span className="text-gray-700 font-medium">{doc.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center mb-16">
          <button
            onClick={() => onStart('edit-magic-link')}
            className="w-full md:w-auto px-12 py-4 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium text-lg"
          >
            I'm Ready, Let's Start
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between">
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
            
            <div className="text-sm text-gray-600 flex items-center space-x-4">
              <span>© 2025 The Date Crew. All Right Reserved.</span>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors underline">
                Terms Of Service
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;