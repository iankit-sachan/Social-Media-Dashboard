import React from 'react';
import { Header } from '../components/Layout/Header';
import { PostCard } from '../components/Posts/PostCard';
import { useSocialMedia } from '../context/SocialMediaContext';
import { Loader2, TrendingUp, Users, Heart, MessageCircle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { posts, analytics, loading } = useSocialMedia();

  const stats = [
    {
      name: 'Total Posts',
      value: analytics.totalPosts,
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+12% from last month',
    },
    {
      name: 'Total Likes',
      value: analytics.totalLikes.toLocaleString(),
      icon: Heart,
      color: 'bg-red-500',
      change: '+18% from last month',
    },
    {
      name: 'Comments',
      value: analytics.totalComments,
      icon: MessageCircle,
      color: 'bg-green-500',
      change: '+7% from last month',
    },
    {
      name: 'Engagement Rate',
      value: `${analytics.engagementRate}%`,
      icon: Users,
      color: 'bg-purple-500',
      change: '+2.1% from last month',
    },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Header />
      
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your social media presence today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.name} 
              className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Posts</h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          
          <div className="space-y-6">
            {posts.slice(0, 5).map((post, index) => (
              <div 
                key={post.id}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};