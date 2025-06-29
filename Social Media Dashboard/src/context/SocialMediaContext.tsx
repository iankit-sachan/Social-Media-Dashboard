import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Comment, Analytics } from '../types';

interface SocialMediaContextType {
  posts: Post[];
  comments: Comment[];
  analytics: Analytics;
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (content: string, platforms: string[], imageUrl?: string, scheduledFor?: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  commentOnPost: (postId: string, content: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  sharePost: (postId: string) => Promise<void>;
}

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export const useSocialMedia = () => {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
};

const mockPosts: Post[] = [
  {
    id: '1',
    platform: 'twitter',
    content: 'Just launched my new website! Excited to share my work with the world. Check it out and let me know what you think! #webdev #design',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: {
      name: 'Sarah Johnson',
      username: '@sarah_creates',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    createdAt: '2024-01-20T10:30:00Z',
    likes: 45,
    comments: 12,
    shares: 8,
    isLiked: true,
  },
  {
    id: '2',
    platform: 'instagram',
    content: 'Beautiful sunset from my office window today. Sometimes we need to pause and appreciate the small moments. 🌅',
    imageUrl: 'https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: {
      name: 'Sarah Johnson',
      username: '@sarah.creates',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    createdAt: '2024-01-19T18:45:00Z',
    likes: 127,
    comments: 23,
    shares: 15,
    isLiked: false,
  },
  {
    id: '3',
    platform: 'facebook',
    content: 'Excited to announce that I\'ll be speaking at the Digital Marketing Conference next month! Can\'t wait to share insights on social media strategy.',
    author: {
      name: 'Sarah Johnson',
      username: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    createdAt: '2024-01-18T14:20:00Z',
    likes: 89,
    comments: 31,
    shares: 22,
    isLiked: true,
  },
  {
    id: '4',
    platform: 'twitter',
    content: 'Tips for better social media engagement: 1) Post consistently 2) Engage with your audience 3) Use relevant hashtags 4) Share valuable content 5) Be authentic! What would you add to this list?',
    isScheduled: true,
    scheduledFor: '2024-01-21T16:00:00Z',
    author: {
      name: 'Sarah Johnson',
      username: '@sarah_creates',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    createdAt: '2024-01-17T09:15:00Z',
    likes: 0,
    comments: 0,
    shares: 0,
    isLiked: false,
  },
];

const mockAnalytics: Analytics = {
  totalPosts: 48,
  totalLikes: 1250,
  totalComments: 340,
  totalShares: 180,
  engagementRate: 7.8,
  platformBreakdown: [
    { platform: 'Instagram', posts: 18, engagement: 8.5 },
    { platform: 'Twitter', posts: 15, engagement: 7.2 },
    { platform: 'Facebook', posts: 12, engagement: 7.8 },
    { platform: 'LinkedIn', posts: 3, engagement: 6.1 },
  ],
  weeklyStats: [
    { day: 'Mon', posts: 3, engagement: 7.2 },
    { day: 'Tue', posts: 5, engagement: 8.1 },
    { day: 'Wed', posts: 2, engagement: 6.8 },
    { day: 'Thu', posts: 4, engagement: 7.9 },
    { day: 'Fri', posts: 6, engagement: 8.4 },
    { day: 'Sat', posts: 3, engagement: 7.1 },
    { day: 'Sun', posts: 2, engagement: 6.9 },
  ],
};

export const SocialMediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>(mockAnalytics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setPosts(mockPosts);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, platforms: string[], imageUrl?: string, scheduledFor?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPosts = platforms.map(platform => ({
        id: `${Date.now()}-${platform}`,
        platform: platform as any,
        content,
        imageUrl,
        author: {
          name: 'Sarah Johnson',
          username: platform === 'twitter' ? '@sarah_creates' : 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        createdAt: scheduledFor || new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isScheduled: !!scheduledFor,
        scheduledFor,
      }));
      
      setPosts(prev => [...newPosts, ...prev]);
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId: string) => {
    try {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      ));
    } catch (err) {
      setError('Failed to like post. Please try again.');
    }
  };

  const commentOnPost = async (postId: string, content: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newComment: Comment = {
        id: Date.now().toString(),
        postId,
        author: {
          name: 'Sarah Johnson',
          username: '@sarah_creates',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        },
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      
      setComments(prev => [...prev, newComment]);
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
    } catch (err) {
      setError('Failed to add comment. Please try again.');
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    }
  };

  const sharePost = async (postId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, shares: post.shares + 1 }
          : post
      ));
    } catch (err) {
      setError('Failed to share post. Please try again.');
    }
  };

  return (
    <SocialMediaContext.Provider value={{
      posts,
      comments,
      analytics,
      loading,
      error,
      fetchPosts,
      createPost,
      likePost,
      commentOnPost,
      deletePost,
      sharePost,
    }}>
      {children}
    </SocialMediaContext.Provider>
  );
};