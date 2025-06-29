import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  Plus,
  Check,
  X
} from 'lucide-react';

const platformIcons = {
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

const platformColors = {
  twitter: 'text-blue-400',
  facebook: 'text-blue-600',
  instagram: 'text-pink-500',
  linkedin: 'text-blue-700',
};

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Header />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account information and connected social media platforms.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 mb-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Check className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-6">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-200 dark:ring-dark-600"
                  />
                  
                  <div className="flex-1 space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 resize-none transition-colors duration-200"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{user.bio}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Statistics */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Account Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">48</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2K</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">340</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">7.8%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Engagement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Connected Accounts</h2>
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Add Account</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {user.connectedAccounts.map((account, index) => {
                    const PlatformIcon = platformIcons[account.platform];
                    return (
                      <div 
                        key={account.id} 
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 hover:shadow-sm transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-3">
                          <PlatformIcon className={`h-6 w-6 ${platformColors[account.platform]}`} />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white capitalize">
                              {account.platform}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{account.username}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            account.isConnected ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                          }`} />
                          <span className={`text-sm ${
                            account.isConnected ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {account.isConnected ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Account Summary */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Follower Summary</h3>
                <div className="space-y-3">
                  {user.connectedAccounts.filter(account => account.isConnected).map((account, index) => {
                    const PlatformIcon = platformIcons[account.platform];
                    return (
                      <div 
                        key={account.id} 
                        className="flex items-center justify-between animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-2">
                          <PlatformIcon className={`h-4 w-4 ${platformColors[account.platform]}`} />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{account.platform}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {account.followers.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">followers</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Total Reach</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {user.connectedAccounts
                        .filter(account => account.isConnected)
                        .reduce((total, account) => total + account.followers, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};