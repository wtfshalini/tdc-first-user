import React from 'react';

const DailyActiveUsers: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [85, 92, 78, 96, 88, 94, 89];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Active Users</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">567</span>
          <span className="text-sm text-green-600 font-medium">Today +5%</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {days.map((day, index) => (
          <div key={day} className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 w-8">{day}</span>
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

export default DailyActiveUsers;