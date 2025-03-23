"use client";

import { useTweets } from "@/hooks/useTweets";

interface Author {
  type: string;
  userName: string;
  url: string;
  id: string;
  name: string;
  isBlueVerified: boolean;
  profilePicture: string;
  // ...other author properties can be included as needed
}

interface Tweet {
  type: string;
  id: string;
  url: string;
  text: string;
  source: string;
  retweetCount: number;
  replyCount: number;
  likeCount: number;
  quoteCount: number;
  viewCount?: number;
  createdAt: string;
  lang: string;
  bookmarkCount?: number;
  isReply: boolean;
  author: Author;

  // Legacy properties kept for backward compatibility
  username?: string;
  handle?: string;
  fullname?: string;
  content?: string;
  timestamp?: string;
  date?: string;
  stats?: {
    comments: number;
    retweets: number;
    quotes: number;
    likes: number;
    views?: number;
  };
  media?: {
    images: string[];
    videos: string[];
  };
}

interface TweetDisplayProps {
  accountHandles: string[];
  maxTweetsPerAccount: number;
}

const TweetDisplay: React.FC<TweetDisplayProps> = ({
  accountHandles,
  maxTweetsPerAccount,
}) => {
  const {
    data: tweets = [],
    isLoading,
    error,
  } = useTweets(accountHandles, maxTweetsPerAccount);
  console.log(tweets);
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Failed to load tweets. Please try again later.
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No tweets found for the selected accounts
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-700">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="p-4 hover:bg-gray-900">
          <div className="flex items-start">
            <div className="mr-3">
              {/* Display actual profile picture if available */}
              {tweet.author?.profilePicture ? (
                <img
                  src={tweet.author.profilePicture}
                  alt={`${tweet.author.name}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold">
                  {tweet.author?.name || tweet.fullname}
                </span>
                {tweet.author?.isBlueVerified && (
                  <span className="ml-1 text-blue-500">✓</span>
                )}
                <span className="text-gray-500 ml-2">
                  @{tweet.author?.userName || tweet.handle}
                </span>
                <span className="text-gray-500 mx-2">·</span>
                <span className="text-gray-500">
                  {new Date(
                    tweet.createdAt || tweet.date || ""
                  ).toLocaleTimeString()}
                </span>
              </div>
              <div className="mt-1">{tweet.text || tweet.content}</div>
              {(tweet?.media?.images?.length || 0) > 0 && (
                <div className="mt-3 rounded-xl overflow-hidden">
                  <img
                    src={tweet?.media?.images[0]}
                    alt="Tweet media"
                    className="max-h-80 w-auto"
                  />
                </div>
              )}
              <div className="flex mt-3 text-gray-500 text-sm justify-between">
                <span>{tweet.replyCount || tweet.stats?.comments || 0} 💬</span>
                <span>
                  {tweet.retweetCount || tweet.stats?.retweets || 0} 🔁
                </span>
                <span>{tweet.likeCount || tweet.stats?.likes || 0} ❤️</span>
                {(tweet.viewCount || tweet.stats?.views) && (
                  <span>{tweet.viewCount || tweet.stats?.views} 👁️</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetDisplay;
