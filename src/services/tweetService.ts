import axios from "axios";
import dayjs from "dayjs";

export interface Author {
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

export interface TweetEntity {
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

export interface Tweet {
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
  media_url_https?: string;
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
  summary?: string;
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
): Promise<{ tweets: Tweet[]; summary?: string }> {
  if (accountHandles.length === 0) {
    return { tweets: [] };
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
          summarize: "true", // Request summarization
        },
      });

      console.log("Proxy response:", response.data);
      return response.data || [];
    });

    const results = await Promise.allSettled(tweetPromises);
    const allTweets: Tweet[] = [];
    let combinedSummary = "";

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        // Extract tweets
        allTweets.push(...(result?.value?.data?.tweets || []));

        // Collect summaries
        if (result?.value?.summary) {
          if (combinedSummary) combinedSummary += "\n\n";
          combinedSummary += result.value.summary;
        }
      }
    });

    // Sort tweets by date (newest first)
    const sortedTweets = allTweets.sort((a, b) => {
      const dateA = dayjs(a.createdAt);
      const dateB = dayjs(b.createdAt);
      return dateB.unix() - dateA.unix();
    });

    return {
      tweets: sortedTweets,
      summary: combinedSummary || undefined,
    };
  } catch (error) {
    console.error("Error fetching tweets from Twitter API:", error);
    return { tweets: [] };
  }
}
