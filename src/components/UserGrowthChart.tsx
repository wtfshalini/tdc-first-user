import React from 'react';

const UserGrowthChart: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const dataPoints = [40, 65, 45, 70, 55, 85, 75];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">User Growth Over Time</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">+15%</span>
          <span className="text-sm text-blue-600 font-medium">Last 30 Days +15%</span>
        </div>
      </div>
      
      <div className="relative h-40">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
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
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={dataPoints.map((point, index) => 
              `${(index * 400) / (dataPoints.length - 1)},${120 - (point * 1.2)}`
            ).join(' ')}
          />
          
          {/* Area fill */}
          <polygon
            fill="url(#gradient)"
            points={[
              '0,120',
              ...dataPoints.map((point, index) => 
                `${(index * 400) / (dataPoints.length - 1)},${120 - (point * 1.2)}`
              ),
              '400,120'
            ].join(' ')}
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={(index * 400) / (dataPoints.length - 1)}
              cy={120 - (point * 1.2)}
              r="4"
              fill="#3B82F6"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          {months.map(month => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGrowthChart;