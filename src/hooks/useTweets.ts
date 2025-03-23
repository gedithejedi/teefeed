import { useQuery } from "@tanstack/react-query";

interface Tweet {
  id: string;
  text: string;
  createdAt?: string;
  replyCount?: number;
  retweetCount?: number;
  likeCount?: number;
  viewCount?: number;
  media_url_https?: string;
  author?: {
    name?: string;
    userName?: string;
    profilePicture?: string;
    isBlueVerified?: boolean;
  };
}

interface TweetsResponse {
  tweets: Tweet[];
  error?: string;
}

const fetchTweetsForUser = async (userName: string): Promise<Tweet[]> => {
  try {
    const response = await fetch(
      `/api/twitter-proxy?username=${encodeURIComponent(userName)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tweets for ${userName}`);
    }

    const data = await response.json();
    return (data?.data?.tweets || []).map((tweet: any) => ({
      ...tweet,
      author: {
        ...tweet.author,
        name: data?.data?.user?.name || userName,
        userName: userName,
        profilePicture: data?.data?.user?.profile_image_url_https,
        isBlueVerified: data?.data?.user?.verified,
      },
    }));
  } catch (error) {
    console.error(`Error fetching tweets for ${userName}:`, error);
    return [];
  }
};

export const useTweets = (
  accountHandles: string[],
  maxTweetsPerAccount: number
) => {
  return useQuery<TweetsResponse>({
    queryKey: ["tweets", ...accountHandles, maxTweetsPerAccount],
    queryFn: async () => {
      try {
        // Fetch tweets for each account
        const tweetPromises = accountHandles.map((handle) =>
          fetchTweetsForUser(handle)
        );
        const allTweetsArrays = await Promise.all(tweetPromises);

        // Flatten and sort all tweets by time
        const allTweets = allTweetsArrays
          .flat()
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // Sort in descending order (newest first)
          })
          .slice(0, maxTweetsPerAccount * accountHandles.length);

        return { tweets: allTweets };
      } catch (error) {
        console.error("Error fetching tweets:", error);
        return { tweets: [], error: "Failed to fetch tweets" };
      }
    },
    enabled: accountHandles.length > 0,
  });
};

export const useTweetSummary = (accountHandles: string[]) => {
  return useQuery({
    queryKey: ["tweetSummary", ...accountHandles],
    queryFn: async () => {
      if (accountHandles.length === 0) {
        return { summary: "" };
      }

      const accountsParam = accountHandles.join(",");
      const response = await fetch(
        `/api/twitter-summary?accounts=${encodeURIComponent(accountsParam)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      return response.json();
    },
    enabled: accountHandles.length > 0,
  });
};
