import axios from "axios";

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
  // ... other tweet properties
}

export interface TweetsResponse {
  tweets: Tweet[];
}

const API_BASE_URL = "/api";

/**
 * Fetch tweets for multiple accounts
 */
export async function fetchTweetsForAccounts(
  accountHandles: string[],
  maxTweetsPerAccount: number
): Promise<Tweet[]> {
  if (accountHandles.length === 0) {
    return [];
  }

  // Create URL parameters for each handle
  const params = new URLSearchParams();
  accountHandles.forEach((handle) => params.append("handle", handle));
  params.append("max", maxTweetsPerAccount.toString());

  // Fetch tweets from API
  const response = await axios.get<TweetsResponse>(
    `${API_BASE_URL}/tweets?${params.toString()}`
  );

  return response.data.tweets;
}

/**
 * Validate if a Twitter handle exists
 */
export async function validateTwitterHandle(handle: string): Promise<boolean> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tweets/validate`, {
      params: { handle },
      timeout: 5000, // 5 seconds timeout
    });
    return response.data.exists === true;
  } catch (error) {
    return false;
  }
}
