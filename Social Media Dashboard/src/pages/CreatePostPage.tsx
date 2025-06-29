import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { useSocialMedia } from '../context/SocialMediaContext';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Image, 
  Calendar, 
  Send,
  Loader2,
  X
} from 'lucide-react';

const platforms = [
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
];

export const CreatePostPage: React.FC = () => {
  const { createPost, loading } = useSocialMedia();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter']);
  const [imageUrl, setImageUrl] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || selectedPlatforms.length === 0) return;

    let scheduledFor: string | undefined;
    if (isScheduled && scheduledDate && scheduledTime) {
      scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
    }

    await createPost(content, selectedPlatforms, imageUrl || undefined, scheduledFor);
    
    // Reset form
    setContent('');
    setImageUrl('');
    setScheduledDate('');
    setScheduledTime('');
    setIsScheduled(false);
  };

  const characterLimit = 280;
  const remainingChars = characterLimit - content.length;

  return (
    <div className="flex-1 bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <Header />
      
      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Post</h1>
            <p className="text-gray-600 dark:text-gray-400">Share your thoughts across multiple social media platforms.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Platform Selection */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select Platforms</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                        : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500 bg-white dark:bg-dark-700'
                    }`}
                  >
                    <platform.icon className={`h-6 w-6 mx-auto mb-2 ${platform.color}`} />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{platform.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Post Content</h3>
                <span className={`text-sm transition-colors duration-200 ${
                  remainingChars < 20 ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {remainingChars} characters remaining
                </span>
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 border border-gray-300 dark:border-dark-600 rounded-lg resize-none bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                rows={6}
                maxLength={characterLimit}
                required
              />
            </div>

            {/* Media Upload */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add Media</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL (optional)
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      id="imageUrl"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                    />
                    {imageUrl && (
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
                
                {imageUrl && (
                  <div className="mt-4 animate-fade-in">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-lg border border-gray-200 dark:border-dark-600"
                      onError={() => setImageUrl('')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Scheduling */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Schedule Post</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isScheduled}
                    onChange={(e) => setIsScheduled(e.target.checked)}
                    className="rounded border-gray-300 dark:border-dark-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-dark-700"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Schedule for later</span>
                </label>
              </div>
              
              {isScheduled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
                  <div>
                    <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      id="scheduledDate"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                      required={isScheduled}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      id="scheduledTime"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-200"
                      required={isScheduled}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !content.trim() || selectedPlatforms.length === 0}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    {isScheduled ? 'Scheduling...' : 'Publishing...'}
                  </>
                ) : (
                  <>
                    {isScheduled ? <Calendar className="h-5 w-5 mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                    {isScheduled ? 'Schedule Post' : 'Publish Now'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};