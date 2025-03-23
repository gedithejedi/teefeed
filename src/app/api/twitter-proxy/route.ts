import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TWITTER_API_URL = "https://api.twitterapi.io";
const NILAI_API_URL = "https://nilai-a779.nillion.network/v1/chat/completions";

export async function GET(request: NextRequest) {
  try {
    // Get endpoint and params from the request
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint") || "twitter/user/last_tweets";
    const userName = searchParams.get("username");
    const shouldSummarize = searchParams.get("summarize") === "true";

    console.log(
      `Proxy request for: ${userName}, summarize: ${shouldSummarize}`
    );

    if (!userName) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    // Make the request to Twitter API
    const response = await axios.get(`${TWITTER_API_URL}/${endpoint}`, {
      params: {
        userName,
      },
      headers: {
        "X-API-Key": process.env.TWITTER_API || "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // If summarization is not requested, return the response as is
    if (!shouldSummarize) {
      return NextResponse.json(response.data);
    }

    // Extract tweets for summarization
    const tweets = response.data?.data?.tweets || [];

    if (tweets.length === 0) {
      return NextResponse.json({
        ...response.data,
        summary: "No tweets to summarize.",
      });
    }

    // Prepare tweets for summarization
    const tweetTexts = tweets
      .map((tweet: any) => tweet.text)
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
                "You are a helpful assistant that summarizes Twitter feeds concisely. Please summarize the following tweets and organize them by tech, sports and entertainment. Summarize these tweets highlighting key themes and insights in an easy to read format split them accordingly by themes format them in MD format. Please ignore any non news related summaries, we do not care about personal life changes and we want to filter all of the fluff out of twitter to keep it focused to user interests which are Sports, Tech and Web3, if that does not fit the criteria please ignore the tweet.",
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

      // Return both the Twitter data and the summary
      return NextResponse.json({
        ...response.data,
        summary,
      });
    } catch (summaryError) {
      console.error("Error generating summary:", summaryError);

      // If summarization fails, still return the tweets but with an error message for the summary
      return NextResponse.json({
        ...response.data,
        summary: "Failed to generate summary. Please try again later.",
      });
    }
  } catch (error: any) {
    console.error("Error proxying Twitter API request:", error.message);

    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch data from Twitter API",
        details: error.message,
        response: error.response?.data || "No response data",
      },
      { status: error.response?.status || 500 }
    );
  }
}
