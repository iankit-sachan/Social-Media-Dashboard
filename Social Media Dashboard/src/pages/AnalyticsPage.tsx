import React from 'react';
import { Header } from '../components/Layout/Header';
import { useSocialMedia } from '../context/SocialMediaContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Heart, MessageCircle, Share2, Target } from 'lucide-react';

const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'];

export const AnalyticsPage: React.FC = () => {
  const { analytics } = useSocialMedia();

  const stats = [
    {
      name: 'Total Posts',
      value: analytics.totalPosts,
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Total Likes',
      value: analytics.totalLikes.toLocaleString(),
      icon: Heart,
      color: 'bg-red-500',
      change: '+18%',
      changeType: 'increase',
    },
    {
      name: 'Comments',
      value: analytics.totalComments,
      icon: MessageCircle,
      color: 'bg-green-500',
      change: '+7%',
      changeType: 'increase',
    },
    {
      name: 'Shares',
      value: analytics.totalShares,
      icon: Share2,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'increase',
    },
    {
      name: 'Engagement Rate',
      value: `${analytics.engagementRate}%`,
      icon: Target,
      color: 'bg-indigo-500',
      change: '+2.1%',
      changeType: 'increase',
    },
    {
      name: 'Avg. Daily Reach',
      value: '12.5K',
      icon: Users,
      color: 'bg-orange-500',
      change: '+8%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Header />
      
      <main className="p-6">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your social media performance and engagement metrics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.name} 
              className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">vs last month</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Platform Breakdown */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Platform Breakdown</h3>
            <div className="space-y-4">
              {analytics.platformBreakdown.map((platform, index) => (
                <div key={platform.platform} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium text-gray-900 dark:text-white">{platform.platform}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{platform.posts} posts</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{platform.engagement}% engagement</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.platformBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="posts"
                    label={({ platform, posts }) => `${platform}: ${posts}`}
                  >
                    {analytics.platformBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg)',
                      border: '1px solid var(--tooltip-border)',
                      borderRadius: '8px',
                      color: 'var(--tooltip-text)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Performance */}
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weekly Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                  <XAxis dataKey="day" stroke="var(--chart-text)" />
                  <YAxis stroke="var(--chart-text)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg)',
                      border: '1px solid var(--tooltip-border)',
                      borderRadius: '8px',
                      color: 'var(--tooltip-text)'
                    }}
                  />
                  <Bar dataKey="posts" fill="#3B82F6" name="Posts" />
                  <Bar dataKey="engagement" fill="#8B5CF6" name="Engagement %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Engagement Trends */}
        <div className="mt-8 bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Engagement Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="day" stroke="var(--chart-text)" />
                <YAxis stroke="var(--chart-text)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                    color: 'var(--tooltip-text)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  name="Engagement Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white animate-fade-in">
            <h4 className="font-bold text-lg mb-2">Best Performing Day</h4>
            <p className="text-blue-100 mb-2">Friday shows the highest engagement</p>
            <p className="text-3xl font-bold">8.4%</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white animate-fade-in">
            <h4 className="font-bold text-lg mb-2">Top Platform</h4>
            <p className="text-purple-100 mb-2">Instagram leads in engagement</p>
            <p className="text-3xl font-bold">8.5%</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white animate-fade-in">
            <h4 className="font-bold text-lg mb-2">Growth Rate</h4>
            <p className="text-green-100 mb-2">Monthly follower growth</p>
            <p className="text-3xl font-bold">+12%</p>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        :root {
          --tooltip-bg: white;
          --tooltip-border: #e5e7eb;
          --tooltip-text: #374151;
          --chart-grid: #e5e7eb;
          --chart-text: #6b7280;
        }
        
        .dark {
          --tooltip-bg: #1e293b;
          --tooltip-border: #475569;
          --tooltip-text: #f1f5f9;
          --chart-grid: #475569;
          --chart-text: #94a3b8;
        }
      `}</style>
    </div>
  );
};