import React, { useState } from 'react';
import Login from './components/Login';
import WelcomeScreen from './components/WelcomeScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import PublicURL from './components/PublicURL';
import Settings from './components/Settings';
import AccountSettings from './components/AccountSettings';
import EditMagicLink from './components/EditMagicLink';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setShowWelcome(true);
  };

  const handleWelcomeComplete = (redirectTo?: string) => {
    setShowWelcome(false);
    if (redirectTo === 'edit-magic-link') {
      setShowOnboarding(true);
      setActiveSection('edit-magic-link');
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setIsLoggedIn(true);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowWelcome(false);
    setShowOnboarding(false);
    setActiveSection('dashboard');
  };

  // Show onboarding form after welcome screen
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 flex relative">
        <div className="w-full flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src="/TDC Logo.png" 
                  alt="The Date Crew" 
                  className="h-8 w-auto"
                />
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          <EditMagicLink onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }
  if (!isLoggedIn) {
    if (showWelcome) {
      return <WelcomeScreen onStart={handleWelcomeComplete} />;
    }
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'analytics':
        return <Analytics />;
      case 'public-url':
        return <PublicURL />;
      case 'edit-magic-link':
        return <EditMagicLink />;
      case 'settings':
        return <Settings />;
      case 'account':
        return <AccountSettings />;
      case 'dashboard':
      default:
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        {renderContent()}
      </div>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;