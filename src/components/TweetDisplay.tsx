"use client";

import { useTweets } from "@/hooks/useTweets";
import dayjs from "dayjs";
import TweetSummary from "./TweetSummary";
import { useState } from "react";

interface TweetDisplayProps {
  accountHandles: string[];
  maxTweetsPerAccount: number;
}

const TweetDisplay: React.FC<TweetDisplayProps> = ({
  accountHandles,
  maxTweetsPerAccount,
}) => {
  const { data, isLoading, error } = useTweets(
    accountHandles,
    maxTweetsPerAccount
  );

  // Track image loading errors
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const tweets = data?.tweets || [];

  // Handle image load error
  const handleImageError = (tweetId: string) => {
    setImgErrors((prev) => ({
      ...prev,
      [tweetId]: true,
    }));
  };

  return (
    <div>
      {/* Summary is now a separate component that fetches data independently */}
      <TweetSummary accountHandles={accountHandles} />

      {isLoading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 text-center">
          Failed to load tweets. Please try again later.
        </div>
      ) : tweets.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No tweets found for the selected accounts
        </div>
      ) : (
        <div className="divide-y divide-gray-700">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="p-4 hover:bg-gray-900">
              <div className="flex items-start">
                <div className="mr-3">
                  {tweet.author?.profilePicture && !imgErrors[tweet.id] ? (
                    <img
                      src={tweet.author.profilePicture}
                      alt={`${tweet.author.name}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={() => handleImageError(tweet.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {tweet.author?.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold">{tweet.author?.name}</span>
                    {tweet.author?.isBlueVerified && (
                      <span className="ml-1 text-blue-500">✓</span>
                    )}
                    <span className="text-gray-500 ml-2">
                      @{tweet.author?.userName}
                    </span>
                    <span className="text-gray-500 mx-2">·</span>
                    <span className="text-gray-500">
                      {dayjs(tweet.createdAt || "").format(
                        "MMM D, YYYY [at] h:mm A"
                      )}
                    </span>
                  </div>
                  <div className="mt-1">{tweet.text}</div>
                  {tweet?.media_url_https && (
                    <div className="mt-3 rounded-xl overflow-hidden">
                      <img
                        src={tweet?.media_url_https}
                        alt="Tweet media"
                        className="max-h-80 w-auto"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex mt-3 text-gray-500 text-sm justify-between">
                    <span>{tweet.replyCount || 0} 💬</span>
                    <span>{tweet.retweetCount || 0} 🔁</span>
                    <span>{tweet.likeCount || 0} ❤️</span>
                    {tweet.viewCount && <span>{tweet.viewCount} 👁️</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetDisplay;
