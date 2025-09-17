import React from 'react';
import { useState } from 'react';
import MetricCard from './MetricCard';
import CalendarFilter from './CalendarFilter';
import UserAnalyticsTable from './UserAnalyticsTable';
import { ChevronLeft, ChevronRight, Eye, MapPin, Clock, Mail, Calendar, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    { title: 'Total Profile Views', value: '1,234', change: '+10%', isPositive: true },
    { title: 'Unique Visitors', value: '567', change: '+5%', isPositive: true },
    { title: 'Average Session', value: '5 mins', change: '-2%', isPositive: false },
    { title: 'Contact Button Clicks', value: '5', change: '-2%', isPositive: false },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600">Detailed insights into your profile performance</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="order-2 lg:order-1">
          <ProfileViewTrends />
        </div>
        <div className="order-1 lg:order-2">
          <DailyUsersWeek />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          <CountryWiseUsers />
        </div>
        <div className="order-1 lg:order-2">
          <AverageSessionTime />
        </div>
      </div>

      <UserAnalyticsTable />
    </div>
  );
};

const ProfileViewTrends: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dataPoints = [120, 180, 150, 220, 190, 280, 250, 320, 290, 350, 380, 420];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile View Trends Over Months</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">420</span>
          <span className="text-sm text-green-600 font-medium">This Month +12%</span>
        </div>
      </div>
      
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 600 160">
          <defs>
            <linearGradient id="profileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
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
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={dataPoints.map((point, index) => 
              `${(index * 600) / (dataPoints.length - 1)},${160 - (point * 0.35)}`
            ).join(' ')}
          />
          
          {/* Area fill */}
          <polygon
            fill="url(#profileGradient)"
            points={[
              '0,160',
              ...dataPoints.map((point, index) => 
                `${(index * 600) / (dataPoints.length - 1)},${160 - (point * 0.35)}`
              ),
              '600,160'
            ].join(' ')}
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={(index * 600) / (dataPoints.length - 1)}
              cy={160 - (point * 0.35)}
              r="4"
              fill="#10B981"
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
          <span className="text-3xl font-bold text-gray-900">89</span>
          <span className="text-sm text-blue-600 font-medium">Today +3%</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {days.map((day, index) => (
          <div key={day} className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 w-10">{day}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{ width: `${values[index]}%` }}
              >
                <span className="text-white text-xs font-medium">{values[index]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CountryWiseUsers: React.FC = () => {
  const countries = [
    { name: 'Delhi, India', users: 234, percentage: 45, flag: '🇮🇳' },
    { name: 'Mumbai, India', users: 156, percentage: 30, flag: '🇮🇳' },
    { name: 'New York, United States', users: 89, percentage: 17, flag: '🇺🇸' },
    { name: 'Toronto, Canada', users: 67, percentage: 13, flag: '🇨🇦' },
    { name: 'Boston, United States', users: 45, percentage: 9, flag: '🇺🇸' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">City Wise Users</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">567</span>
          <span className="text-sm text-purple-600 font-medium">Total Users</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {countries.map((country, index) => (
          <div key={country.name} className="flex items-center space-x-4">
            <span className="text-2xl">{country.flag}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{country.name}</span>
                <span className="text-sm text-gray-500">{country.users} users</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${country.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AverageSessionTime: React.FC = () => {
  const timeData = [
    { time: '00:00', duration: 2.5 },
    { time: '04:00', duration: 1.8 },
    { time: '08:00', duration: 4.2 },
    { time: '12:00', duration: 5.8 },
    { time: '16:00', duration: 6.5 },
    { time: '20:00', duration: 4.1 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Average Session Over Time</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">5.2</span>
          <span className="text-sm text-orange-600 font-medium">minutes avg</span>
        </div>
      </div>
      
      <div className="relative h-40">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <defs>
            <linearGradient id="sessionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 24}
              x2="400"
              y2={i * 24}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={timeData.map((point, index) => 
              `${(index * 400) / (timeData.length - 1)},${120 - (point.duration * 15)}`
            ).join(' ')}
          />
          
          {/* Area fill */}
          <polygon
            fill="url(#sessionGradient)"
            points={[
              '0,120',
              ...timeData.map((point, index) => 
                `${(index * 400) / (timeData.length - 1)},${120 - (point.duration * 15)}`
              ),
              '400,120'
            ].join(' ')}
          />
          
          {/* Data points */}
          {timeData.map((point, index) => (
            <circle
              key={index}
              cx={(index * 400) / (timeData.length - 1)}
              cy={120 - (point.duration * 15)}
              r="4"
              fill="#F59E0B"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          {timeData.map(data => (
            <span key={data.time} className="text-xs">{data.time}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;