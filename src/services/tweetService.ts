import axios from "axios";
import dayjs from "dayjs";

interface Author {
  type: string;
  userName: string;
  url: string;
  id: string;
  name: string;
  isBlueVerified: boolean;
  profilePicture: string;
  coverPicture?: string;
  description?: string;
  location?: string;
  followers: number;
  following: number;
  canDm?: boolean;
  createdAt: string;
  fastFollowersCount?: number;
  favouritesCount?: number;
  hasCustomTimelines?: boolean;
  isTranslator?: boolean;
  mediaCount?: number;
  statusesCount?: number;
  withheldInCountries?: string[];
  affiliatesHighlightedLabel?: any;
  possiblySensitive?: boolean;
  pinnedTweetIds?: string[];
  isAutomated?: boolean;
  automatedBy?: string;
  unavailable?: boolean;
  message?: string;
  unavailableReason?: string;
  profile_bio?: {
    description: string;
    entities: {
      description?: {
        urls: {
          display_url: string;
          expanded_url: string;
          indices: number[];
          url: string;
        }[];
      };
      url?: {
        urls: {
          display_url: string;
          expanded_url: string;
          indices: number[];
          url: string;
        }[];
      };
    };
  };
}

interface TweetEntity {
  hashtags?: {
    indices: number[];
    text: string;
  }[];
  urls?: {
    display_url: string;
    expanded_url: string;
    indices: number[];
    url: string;
  }[];
  user_mentions?: {
    id_str: string;
    name: string;
    screen_name: string;
  }[];
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
  inReplyToId?: string;
  conversationId?: string;
  inReplyToUserId?: string;
  inReplyToUsername?: string;
  author: Author;
  entities?: TweetEntity;
  quoted_tweet?: any;
  retweeted_tweet?: any;
}

export interface TweetsResponse {
  tweets: Tweet[];
  has_next_page?: boolean;
  next_cursor?: string;
  status?: string;
  message?: string;
}

// Update the URL to use our proxy API route instead of direct Twitter API
export const API_BASE_URL = "/api";
export const TWITTER_PROXY_URL = "/api/twitter-proxy";

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

  try {
    // Create an array of promises to fetch tweets for each account
    const tweetPromises = accountHandles.map(async (handle) => {
      // Use our proxy API instead of directly calling Twitter API
      const response = await axios.get(TWITTER_PROXY_URL, {
        params: {
          endpoint: "twitter/user/last_tweets",
          username: handle,
          limit: maxTweetsPerAccount,
        },
      });

      console.log("Proxy response:", response.data);
      return response.data || [];
    });

    const results = await Promise.allSettled(tweetPromises);
    const allTweets: Tweet[] = [];
    console.log("results", results);
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        allTweets.push(...(result?.value?.data?.tweets || []));
      }
    });

    // Sort tweets by date (newest first)
    return allTweets.sort((a, b) => {
      const dateA = dayjs(a.createdAt);
      const dateB = dayjs(b.createdAt);
      return dateB.unix() - dateA.unix();
    });

    console.log("allTweets", allTweets);
  } catch (error) {
    console.error("Error fetching tweets from Twitter API:", error);
    return [];
  }
}
