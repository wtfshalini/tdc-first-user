import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <span className={`text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-500'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;