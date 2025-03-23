import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TWITTER_API_URL = "https://api.twitterapi.io";

export async function GET(request: NextRequest) {
  try {
    // Get username and cursor from the request
    const { searchParams } = new URL(request.url);
    const userName = searchParams.get("username");

    if (!userName) {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    // Make the request to Twitter API for followings
    const response = await axios.get(
      `${TWITTER_API_URL}/twitter/user/followings`,
      {
        params: {
          userName,
        },
        headers: {
          "X-API-Key": process.env.TWITTER_API || "",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // Return the Twitter API response
    return NextResponse.json(response.data?.followings);
  } catch (error: any) {
    console.error("Error fetching Twitter followings:", error.message);

    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch followings from Twitter API",
        details: error.message,
        response: error.response?.data || "No response data",
      },
      { status: error.response?.status || 500 }
    );
  }
}
