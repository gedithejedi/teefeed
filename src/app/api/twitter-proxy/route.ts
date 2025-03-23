import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TWITTER_API_URL = "https://api.twitterapi.io";

export async function GET(request: NextRequest) {
  try {
    // Get endpoint and params from the request
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint") || "twitter/user/last_tweets";
    const userName = searchParams.get("username");

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

    // Return the Twitter API response
    return NextResponse.json(response.data);
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
