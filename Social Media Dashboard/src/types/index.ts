export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  connectedAccounts: ConnectedAccount[];
}

export interface ConnectedAccount {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  username: string;
  isConnected: boolean;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  content: string;
  imageUrl?: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isScheduled?: boolean;
  scheduledFor?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface Analytics {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  engagementRate: number;
  platformBreakdown: {
    platform: string;
    posts: number;
    engagement: number;
  }[];
  weeklyStats: {
    day: string;
    posts: number;
    engagement: number;
  }[];
}