import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, MapPin, Clock, Mail, Calendar, Filter, Search, Download, User } from 'lucide-react';

interface UserSession {
  id: string;
  name: string;
  email: string;
  location: string;
  sessionTime: string;
  viewTime: string;
  timestamp: string;
  device: string;
}

const UserAnalyticsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof UserSession>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data for user sessions
  const allSessions: UserSession[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      location: 'New York, USA',
      sessionTime: '5m 32s',
      viewTime: '2024-01-15 14:30:22',
      timestamp: '2024-01-15T14:30:22Z',
      device: 'Desktop',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@yahoo.com',
      location: 'London, UK',
      sessionTime: '8m 15s',
      viewTime: '2024-01-15 12:45:10',
      timestamp: '2024-01-15T12:45:10Z',
      device: 'Mobile',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@outlook.com',
      location: 'Toronto, Canada',
      sessionTime: '3m 48s',
      viewTime: '2024-01-15 10:20:05',
      timestamp: '2024-01-15T10:20:05Z',
      device: 'Tablet',
    },
    {
      id: '4',
      name: 'Emma Brown',
      email: 'emma.brown@gmail.com',
      location: 'Sydney, Australia',
      sessionTime: '12m 03s',
      viewTime: '2024-01-14 16:15:30',
      timestamp: '2024-01-14T16:15:30Z',
      device: 'Desktop',
    },
    {
      id: '5',
      name: 'Alex Davis',
      email: 'alex.davis@hotmail.com',
      location: 'Berlin, Germany',
      sessionTime: '6m 22s',
      viewTime: '2024-01-14 14:50:18',
      timestamp: '2024-01-14T14:50:18Z',
      device: 'Mobile',
    },
    {
      id: '6',
      name: 'Lisa Garcia',
      email: 'lisa.garcia@gmail.com',
      location: 'Madrid, Spain',
      sessionTime: '9m 41s',
      viewTime: '2024-01-14 11:30:45',
      timestamp: '2024-01-14T11:30:45Z',
      device: 'Desktop',
    },
    {
      id: '7',
      name: 'David Miller',
      email: 'david.miller@yahoo.com',
      location: 'Paris, France',
      sessionTime: '4m 17s',
      viewTime: '2024-01-13 18:25:12',
      timestamp: '2024-01-13T18:25:12Z',
      device: 'Mobile',
    },
    {
      id: '8',
      name: 'Anna Taylor',
      email: 'anna.taylor@gmail.com',
      location: 'Tokyo, Japan',
      sessionTime: '7m 55s',
      viewTime: '2024-01-13 15:40:33',
      timestamp: '2024-01-13T15:40:33Z',
      device: 'Desktop',
    },
    {
      id: '9',
      name: 'Chris Anderson',
      email: 'chris.anderson@outlook.com',
      location: 'Mumbai, India',
      sessionTime: '11m 28s',
      viewTime: '2024-01-13 09:15:20',
      timestamp: '2024-01-13T09:15:20Z',
      device: 'Mobile',
    },
    {
      id: '10',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@gmail.com',
      location: 'Mexico City, Mexico',
      sessionTime: '5m 09s',
      viewTime: '2024-01-12 20:30:15',
      timestamp: '2024-01-12T20:30:15Z',
      device: 'Tablet',
    },
    {
      id: '11',
      name: 'Robert White',
      email: 'robert.white@yahoo.com',
      location: 'Chicago, USA',
      sessionTime: '8m 44s',
      viewTime: '2024-01-12 17:20:08',
      timestamp: '2024-01-12T17:20:08Z',
      device: 'Desktop',
    },
    {
      id: '12',
      name: 'Sophie Martin',
      email: 'sophie.martin@gmail.com',
      location: 'Amsterdam, Netherlands',
      sessionTime: '6m 33s',
      viewTime: '2024-01-12 13:45:22',
      timestamp: '2024-01-12T13:45:22Z',
      device: 'Mobile',
    }
  ];

  // Filter and sort sessions
  const filteredSessions = allSessions
    .filter(session => {
      const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (dateFilter === 'all') return matchesSearch;
      
      const sessionDate = new Date(session.timestamp);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          return daysDiff === 0 && matchesSearch;
        case 'week':
          return daysDiff <= 7 && matchesSearch;
        case 'month':
          return daysDiff <= 30 && matchesSearch;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSessions = filteredSessions.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof UserSession) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    // In a real app, this would export the data to CSV/Excel
    console.log('Exporting data...', filteredSessions);
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">User Session Analytics</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Detailed view of Magic Link profile visitors</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-custom-amber text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent text-sm"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom-amber focus:border-transparent text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('viewTime')}
                >
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Time</span>
                    <span className="sm:hidden">Date</span>
                    {sortField === 'viewTime' && (
                      <span className="text-custom-amber">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Name</span>
                    {sortField === 'name' && (
                      <span className="text-custom-amber">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Email</span>
                    {sortField === 'email' && (
                      <span className="text-custom-amber">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Location</span>
                    {sortField === 'location' && (
                      <span className="text-custom-amber">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('sessionTime')}
                >
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Session Time</span>
                    {sortField === 'sessionTime' && (
                      <span className="text-custom-amber">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Device
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    <div className="sm:hidden">{session.viewTime.split(' ')[0]}</div>
                    <div className="hidden sm:block">{session.viewTime}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{session.name}</div>
                      <div className="text-xs text-gray-500 md:hidden">{session.email}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-custom-amber" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{session.email}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm text-gray-900">{session.location}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{session.sessionTime}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      session.device === 'Desktop' ? 'bg-blue-100 text-blue-800' :
                      session.device === 'Mobile' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {session.device}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSessions.length)} of {filteredSessions.length} results
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 sm:p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              <div className="hidden sm:flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-custom-amber text-white'
                          : 'text-gray-600 hover:bg-white border border-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <div className="sm:hidden text-xs text-gray-600">
                {currentPage} / {totalPages}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 sm:p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalyticsTable;