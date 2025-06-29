import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  BarChart3, 
  Calendar, 
  Settings, 
  User,
  LogOut,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Create Post', href: '/create', icon: PlusCircle },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const platforms = [
  { name: 'Twitter', icon: Twitter, color: 'text-blue-400', connected: true },
  { name: 'Facebook', icon: Facebook, color: 'text-blue-600', connected: true },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500', connected: true },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', connected: false },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 h-screen flex flex-col transition-colors duration-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">TechWiPro</h1>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-dark-600"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 transition-colors duration-200" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Connected Platforms */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Connected Accounts
        </h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <platform.icon className={`h-4 w-4 ${platform.color}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{platform.name}</span>
              </div>
              <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                platform.connected ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-dark-700">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};