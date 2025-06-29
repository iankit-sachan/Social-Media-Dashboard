import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { useSocialMedia } from '../context/SocialMediaContext';
import { Calendar, Clock, Edit, Trash2, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { format, isAfter } from 'date-fns';

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

export const SchedulePage: React.FC = () => {
  const { posts, deletePost } = useSocialMedia();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduledPosts = posts.filter(post => post.isScheduled && post.scheduledFor);
  const filteredPosts = scheduledPosts.filter(post => {
    if (!post.scheduledFor) return false;
    const postDate = new Date(post.scheduledFor).toISOString().split('T')[0];
    return postDate === selectedDate;
  });

  const upcomingPosts = scheduledPosts.filter(post => 
    post.scheduledFor && isAfter(new Date(post.scheduledFor), new Date())
  ).slice(0, 5);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Header />
      
      <main className="p-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Scheduled Posts</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your scheduled social media content.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Schedule Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Schedule Calendar</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                />
              </div>

              {/* Posts for Selected Date */}
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No posts scheduled for {format(new Date(selectedDate), 'MMMM d, yyyy')}</p>
                  </div>
                ) : (
                  filteredPosts.map((post, index) => {
                    const PlatformIcon = platformIcons[post.platform];
                    return (
                      <div 
                        key={post.id} 
                        className="border border-gray-200 dark:border-dark-600 rounded-lg p-4 hover:shadow-sm dark:hover:shadow-lg transition-all duration-200 bg-white dark:bg-dark-700 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <PlatformIcon className={`h-5 w-5 ${platformColors[post.platform]}`} />
                              <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                {post.platform}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">
                                {format(new Date(post.scheduledFor!), 'h:mm a')}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors duration-200 rounded hover:bg-gray-100 dark:hover:bg-dark-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => deletePost(post.id)}
                              className="p-1 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200 rounded hover:bg-gray-100 dark:hover:bg-dark-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{post.content}</p>
                        
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt="Post preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-dark-600"
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Schedule Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Scheduled</span>
                  <span className="font-bold text-gray-900 dark:text-white">{scheduledPosts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {scheduledPosts.filter(post => {
                      if (!post.scheduledFor) return false;
                      const postDate = new Date(post.scheduledFor);
                      const weekFromNow = new Date();
                      weekFromNow.setDate(weekFromNow.getDate() + 7);
                      return postDate >= new Date() && postDate <= weekFromNow;
                    }).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">This Month</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {scheduledPosts.filter(post => {
                      if (!post.scheduledFor) return false;
                      const postDate = new Date(post.scheduledFor);
                      const monthFromNow = new Date();
                      monthFromNow.setMonth(monthFromNow.getMonth() + 1);
                      return postDate >= new Date() && postDate <= monthFromNow;
                    }).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Posts */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Posts</h3>
              <div className="space-y-3">
                {upcomingPosts.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming posts scheduled</p>
                ) : (
                  upcomingPosts.map((post, index) => {
                    const PlatformIcon = platformIcons[post.platform];
                    return (
                      <div 
                        key={post.id} 
                        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <PlatformIcon className={`h-4 w-4 mt-1 ${platformColors[post.platform]}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{post.content}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(post.scheduledFor!), 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Best Times to Post */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Best Times to Post</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Twitter className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Twitter</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">9 AM, 3 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-4 w-4 text-pink-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Instagram</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">11 AM, 5 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Facebook</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">1 PM, 7 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">LinkedIn</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">8 AM, 12 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};