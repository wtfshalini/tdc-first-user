import React, { useState } from 'react';
import MetricCard from './MetricCard';
import CalendarFilter from './CalendarFilter';
import { ExternalLink, Copy, User, BarChart3, Download } from 'lucide-react';

interface DashboardProps {
  setActiveSection?: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveSection }) => {
  const metrics = [
    { title: 'Total Profile Views', value: '1,234', change: '+10%', isPositive: true },
    { title: 'Unique Visitors', value: '567', change: '+5%', isPositive: true },
    { title: 'Average Session', value: '5 mins', change: '-2%', isPositive: false },
    { title: 'Contact Button Clicks', value: '5', change: '-2%', isPositive: false },
  ];

  const handleQuickAction = (action: string) => {
    if (setActiveSection) {
      setActiveSection(action);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-sm sm:text-base text-gray-600">Track user engagement metrics</p>
        </div>
        <div className="hidden sm:block">
          <CalendarFilter />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Magic Link</h2>
          <MagicLinkWidget />
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            <QuickActionCard
              title="Update Profile"
              description="Customize your profile"
              icon={User}
              onClick={() => handleQuickAction('edit-magic-link')}
            />
            <QuickActionCard
              title="View Analytics"
              description="View user metrics"
              icon={BarChart3}
              onClick={() => handleQuickAction('analytics')}
            />
            <QuickActionCard
              title="Export Profile"
              description="Download PDF"
              icon={Download}
              onClick={() => handleQuickAction('public-url')}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">User Activity</h2>
          <button className="text-custom-amber hover:text-opacity-80 font-medium text-xs sm:text-sm flex items-center space-x-1">
            <span>View All Analytics</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileViewTrends />
          <DailyUsersWeek />
        </div>
      </div>
    </div>
  );
};

const ProfileViewTrends: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const dataPoints = [120, 180, 150, 220, 190, 280, 250];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile View Trends Over Months</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">+15%</span>
          <span className="text-sm text-green-600 font-medium">Last 30 Days +15%</span>
        </div>
      </div>
      
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 600 160">
          <defs>
            <linearGradient id="profileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 32}
              x2="600"
              y2={i * 32}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={dataPoints.map((point, index) => 
              `${(index * 600) / (dataPoints.length - 1)},${160 - (point * 0.5)}`
            ).join(' ')}
          />
          
          {/* Area fill */}
          <polygon
            fill="url(#profileGradient)"
            points={[
              '0,160',
              ...dataPoints.map((point, index) => 
                `${(index * 600) / (dataPoints.length - 1)},${160 - (point * 0.5)}`
              ),
              '600,160'
            ].join(' ')}
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={(index * 600) / (dataPoints.length - 1)}
              cy={160 - (point * 0.5)}
              r="4"
              fill="#3B82F6"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          {months.map(month => (
            <span key={month} className="text-xs">{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const DailyUsersWeek: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [85, 92, 78, 96, 88, 94, 89];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Users Over The Week</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">567</span>
          <span className="text-sm text-green-600 font-medium">Today +5%</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {days.map((day, index) => (
          <div key={day} className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 w-10">{day}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${values[index]}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 w-8">{values[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MagicLinkWidget: React.FC = () => {
  const profileUrl = 'https://thedatecrew.com/profile/sophia-clark';
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 flex-1 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Magic Link</h3>
        <p className="text-sm text-gray-600">
          Share your profile link to track engagement and conversions
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-700 font-mono truncate">{profileUrl}</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={handleCopy}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="p-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Copy className="w-5 h-5" />
          </button>
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
              {copied ? 'Copied' : 'Copy Link'}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  hasExternalLink?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon: Icon, hasExternalLink }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-custom-amber" />
          </div>
          {hasExternalLink && (
            <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;