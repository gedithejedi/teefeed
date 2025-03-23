import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TWITTER_API_URL = "https://api.twitterapi.io";
const NILAI_API_URL = "https://nilai-a779.nillion.network/v1/chat/completions";

export async function GET(request: NextRequest) {
  try {
    // Get accounts from the request parameters
    const { searchParams } = new URL(request.url);
    const accounts = searchParams.get("accounts");

    if (!accounts) {
      return NextResponse.json(
        { error: "Accounts parameter is required (comma-separated list)" },
        { status: 400 }
      );
    }

    const accountsList = accounts.split(",").map((account) => account.trim());

    if (accountsList.length === 0) {
      return NextResponse.json(
        { error: "At least one account is required" },
        { status: 400 }
      );
    }

    console.log(`Generating summary for accounts: ${accountsList.join(", ")}`);

    // Fetch tweets for all accounts
    const allTweets = [];

    for (const userName of accountsList) {
      try {
        const response = await axios.get(
          `${TWITTER_API_URL}/twitter/user/last_tweets`,
          {
            params: { userName, count: 10 }, // Limit to 10 tweets per account for summary
            headers: {
              "X-API-Key": process.env.TWITTER_API || "",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const tweets = response.data?.data?.tweets || [];
        if (tweets.length > 0) {
          const tweetsWithAuthor = tweets.map((tweet: any) => ({
            ...tweet,
            author: {
              userName,
              name: response.data?.data?.user?.name || userName,
            },
          }));
          allTweets.push(...tweetsWithAuthor);
        }
      } catch (error) {
        console.error(`Error fetching tweets for ${userName}:`, error);
        // Continue with other accounts even if one fails
      }
    }

    if (allTweets.length === 0) {
      return NextResponse.json({
        summary: "No tweets found for the selected accounts.",
      });
    }

    // Prepare tweets for summarization
    const tweetTexts = allTweets
      .map((tweet: any) => `Tweet by @${tweet.author.userName}: ${tweet.text}`)
      .join(". END OF TWEET\n\n");

    // Call Nilai API for summarization
    try {
      const summaryResponse = await fetch(`${NILAI_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NILAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that summarizes Twitter feeds concisely. Please summarize the following tweets and organize them by tech, sports and entertainment. Summarize these tweets highlighting key themes and insights in an easy to read format split them accordingly by themes format them in MD format. Please ignore any non news related summaries, we do not care about personal life changes and we want to filter all of the fluff out of twitter to keep it focused to user interests which are Sports, Tech and Web3, if that does not fit the criteria please ignore the tweet. Also please keep it concise if there are many tweets, and only pick 3 most interesting points given the criteria.",
            },
            {
              role: "user",
              content: `${tweetTexts}`,
            },
          ],
          temperature: 0.2,
        }),
      });

      const summaryData = await summaryResponse.json();
      const summary =
        summaryData.choices?.[0]?.message?.content ||
        "Unable to generate summary.";

      // Return the summary
      return NextResponse.json({ summary });
    } catch (summaryError) {
      console.error("Error generating summary:", summaryError);
      return NextResponse.json(
        {
          error: "Failed to generate summary",
          details: (summaryError as Error).message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in tweet summary API:", error.message);
    return NextResponse.json(
      {
        error: "Failed to generate summary",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
