import React from 'react';
import { Bell, ExternalLink, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-900 text-sm lg:text-base">Sophia Clark</p>
              <p className="text-xs lg:text-sm text-gray-500">sophia@mail.in</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-custom-amber rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs sm:text-sm">SC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;