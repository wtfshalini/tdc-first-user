import React from 'react';
import { Home, BarChart3, Link2, Settings, MessageSquare, User, HelpCircle, Calendar, CalendarCheck, CalendarPlus, ExternalLink, Edit, LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, onLogout, isOpen, onClose }) => {
  const handleItemClick = (itemId: string, isLogout?: boolean) => {
    if (isLogout) {
      onLogout();
    } else {
      setActiveSection(itemId);
    }
    if (onClose) {
      onClose();
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, section: 'main' },
  ];

  const matchmakingItems = [
    { id: 'active-matches', label: 'Active Matches', icon: MessageSquare, section: 'matchmaking' },
    { id: 'review-profiles', label: 'Review Profiles', icon: User, section: 'matchmaking' },
  ];

  const signatureItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3, section: 'signature' },
    { id: 'public-url', label: 'Public URL', icon: Link2, section: 'signature' },
    { id: 'edit-magic-link', label: 'Edit Magic Link', icon: Edit, section: 'signature' },
    { id: 'settings', label: 'Settings', icon: Settings, section: 'signature' },
  ];

  const consultationItems = [
    { id: 'upcoming-consultation', label: 'Upcoming Consultations', icon: Calendar, section: 'consultation' },
    { id: 'past-consultation', label: 'Past Consultations', icon: CalendarCheck, section: 'consultation' },
    { id: 'book-consultation', label: 'Book Consultations', icon: CalendarPlus, section: 'consultation', hasExternalLink: true },
  ];

  const adviceItems = [
    { id: 'advices', label: 'Advices', icon: MessageSquare, section: 'advices', hasExternalLink: true },
  ];

  const helpItems = [
    { id: 'account', label: 'Account Settings', icon: User, section: 'help' },
    { id: 'help', label: 'Help', icon: HelpCircle, section: 'help' },
    { id: 'logout', label: 'Logout', icon: LogOut, section: 'help', isLogout: true },
  ];

  const renderMenuItem = (item: any, isActive: boolean) => (
    <button
      key={item.id}
      onClick={() => handleItemClick(item.id, item.isLogout)}
      className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
        isActive
          ? 'bg-custom-amber text-white rounded-lg shadow-md'
          : item.isLogout 
            ? 'text-red-600 hover:bg-red-50 rounded-lg'
            : 'text-gray-700 hover:bg-gray-100 rounded-lg'
      }`}
    >
      <item.icon className={`w-5 h-5 mr-3 ${item.isLogout ? 'text-red-600' : ''}`} />
      <span className={`font-medium ${item.isLogout ? 'text-red-600' : ''}`}>{item.label}</span>
      {item.hasExternalLink && (
        <ExternalLink className="w-4 h-4 ml-auto" />
      )}
      {item.id === 'advices' && isActive && (
        <div className="ml-auto w-2 h-2 bg-white rounded-full" />
      )}
    </button>
  );

  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 h-full flex flex-col transform transition-transform duration-300 ease-in-out lg:transform-none ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="/TDC Logo.png" 
            alt="The Date Crew" 
            className="h-8 sm:h-10 w-auto"
          />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-8">
        <div>
          {menuItems.map(item => renderMenuItem(item, activeSection === item.id))}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Matchmaking
          </h3>
          <div className="space-y-1">
            {matchmakingItems.map(item => renderMenuItem(item, activeSection === item.id))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Magic Link
          </h3>
          <div className="space-y-1">
            {signatureItems.map(item => renderMenuItem(item, activeSection === item.id))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Consultations
          </h3>
          <div className="space-y-1">
            {consultationItems.map(item => renderMenuItem(item, activeSection === item.id))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Advices
          </h3>
          <div className="space-y-1">
            {adviceItems.map(item => renderMenuItem(item, activeSection === item.id))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Help Center
          </h3>
          <div className="space-y-1">
            {helpItems.map(item => renderMenuItem(item, activeSection === item.id))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;