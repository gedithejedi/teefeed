"use client";

import { useTweets } from "@/hooks/useTweets";

interface Tweet {
  id: string;
  username: string;
  handle: string;
  fullname: string;
  content: string;
  timestamp: string;
  date: string;
  stats: {
    comments: number;
    retweets: number;
    quotes: number;
    likes: number;
    views?: number;
  };
  media: {
    images: string[];
    videos: string[];
  };
  // ...other tweet properties
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
              {/* Avatar placeholder - replace with actual avatar component */}
              <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold">{tweet.fullname}</span>
                <span className="text-gray-500 ml-2">@{tweet.handle}</span>
                <span className="text-gray-500 mx-2">·</span>
                <span className="text-gray-500">{tweet.timestamp}</span>
              </div>
              <div className="mt-1">{tweet.content}</div>
              {tweet.media?.images?.length > 0 && (
                <div className="mt-3 rounded-xl overflow-hidden">
                  <img
                    src={tweet.media.images[0]}
                    alt="Tweet media"
                    className="max-h-80 w-auto"
                  />
                </div>
              )}
              <div className="flex mt-3 text-gray-500 text-sm justify-between">
                <span>{tweet.stats?.comments || 0} 💬</span>
                <span>{tweet.stats?.retweets || 0} 🔁</span>
                <span>{tweet.stats?.likes || 0} ❤️</span>
                {tweet.stats?.views && <span>{tweet.stats.views} 👁️</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetDisplay;
