import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Clock, Trash2 } from 'lucide-react';
import { Post } from '../../types';
import { useSocialMedia } from '../../context/SocialMediaContext';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

const platformColors = {
  twitter: 'bg-blue-400',
  facebook: 'bg-blue-600',
  instagram: 'bg-pink-500',
  linkedin: 'bg-blue-700',
};

const platformNames = {
  twitter: 'Twitter',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost, commentOnPost, sharePost, deletePost } = useSocialMedia();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleComment = async () => {
    if (commentText.trim()) {
      await commentOnPost(post.id, commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const handleShare = () => {
    sharePost(post.id);
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-dark-600"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900 dark:text-white">{post.author.name}</h3>
              <span className={`inline-block w-2 h-2 rounded-full ${platformColors[post.platform]}`} />
              <span className="text-sm text-gray-500 dark:text-gray-400">{platformNames[post.platform]}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.isScheduled ? (
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Scheduled for {formatDistanceToNow(new Date(post.scheduledFor!), { addSuffix: true })}</span>
                </span>
              ) : (
                formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
              )}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-gray-200 dark:border-dark-600 py-1 z-10 animate-slide-up">
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 dark:text-gray-100 mb-3 leading-relaxed">{post.content}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96 border border-gray-200 dark:border-dark-600"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-700">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
              post.isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          
          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-all duration-200 hover:scale-105"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-dark-700 animate-slide-up">
          <div className="flex space-x-3">
            <img
              src={post.author.avatar}
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-dark-600"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-3 border border-gray-300 dark:border-dark-600 rounded-lg resize-none bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setShowCommentInput(false)}
                  className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};