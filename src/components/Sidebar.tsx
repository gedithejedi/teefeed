"use client";

import { useState, useEffect } from "react";

// Define account type
interface Account {
  id: string;
  name: string;
  handle: string;
  profilePicture: string;
}

// Define feed source type
type FeedSourceType = "suggestions" | "followings";

// Props for the sidebar component
interface SidebarProps {
  onAccountsChange?: (accounts: string[]) => void;
  onRefetch?: (accounts: string[]) => void;
}

export default function Sidebar({ onAccountsChange, onRefetch }: SidebarProps) {
  // Selected feed source type
  const [feedSource, setFeedSource] = useState<FeedSourceType>("suggestions");

  // Input field for username to fetch followings
  const [followingsUsername, setFollowingsUsername] =
    useState("VitalikButerin");
  const [isInputValid, setIsInputValid] = useState(true);

  // Suggested accounts
  const suggestedAccounts: Account[] = [
    {
      id: "1",
      name: "NBA",
      handle: "NBA",
      profilePicture:
        "https://nitter.net/pic/pbs.twimg.com%2Fprofile_images%2F1902577687291432960%2F88FPnfLf.jpg",
    },
    {
      id: "2",
      name: "Vitalik Buterin",
      handle: "VitalikButerin",
      profilePicture:
        "https://nitter.net/pic/pbs.twimg.com%2Fprofile_images%2F1895872023944937472%2FUoyc5-p8_400x400.jpg",
    },
    {
      id: "3",
      name: "Web3 Daily",
      handle: "web3daily",
      profilePicture:
        "https://nitter.net/pic/pbs.twimg.com%2Fprofile_images%2F1872721502891585536%2FhPrMJQCd_400x400.jpg",
    },
    {
      id: "4",
      name: "CoinDesk",
      handle: "CoinDesk",
      profilePicture:
        "https://nitter.net/pic/pbs.twimg.com%2Fprofile_images%2F1840920544608165896%2FniPELF6e_400x400.jpg",
    },
  ];

  // Default to first 3 accounts
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    suggestedAccounts.slice(0, 3).map((account) => account.handle)
  );

  // Track applied accounts to detect changes
  const [appliedAccounts, setAppliedAccounts] =
    useState<string[]>(selectedAccounts);

  // Loading state for refetch button
  const [isRefetching, setIsRefetching] = useState(false);

  // Following accounts (to be populated when followings source is selected)
  const [followingAccounts, setFollowingAccounts] = useState<Account[]>([]);
  const [isLoadingFollowings, setIsLoadingFollowings] = useState(false);
  const [followingsError, setFollowingsError] = useState<string | null>(null);

  // Update parent component when selected accounts change
  useEffect(() => {
    if (onAccountsChange) {
      onAccountsChange(selectedAccounts);
    }
  }, [selectedAccounts, onAccountsChange]);

  // Load followings when feed source changes to "followings"
  useEffect(() => {
    if (feedSource === "followings" && followingsUsername) {
      fetchFollowings();
    }
  }, [feedSource, followingsUsername]);

  // Automatically select first 3 followings when they're loaded
  useEffect(() => {
    if (feedSource === "followings" && followingAccounts.length > 0) {
      const firstThreeHandles = followingAccounts
        .slice(0, 3)
        .map((account) => account.handle);

      setSelectedAccounts(firstThreeHandles);
      setAppliedAccounts(firstThreeHandles);
    }
  }, [feedSource, followingAccounts]);

  const fetchFollowings = async () => {
    if (!followingsUsername.trim()) {
      setIsInputValid(false);
      setFollowingsError("Please enter a valid username");
      return;
    }

    setIsInputValid(true);

    try {
      setIsLoadingFollowings(true);
      setFollowingsError(null);

      // Fetch only 5 followings
      const response = await fetch(
        `/api/twitter-followings?username=${encodeURIComponent(
          followingsUsername.trim()
        )}&limit=5`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch followings: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        setFollowingsError("No followings found for this account");
        setFollowingAccounts([]);
        setSelectedAccounts([]);
        return;
      }

      // Transform the API response to match our Account interface
      const accounts: Account[] = data.map((account: any) => ({
        id: account.id.toString(),
        name: account.name,
        handle: account.screen_name,
        profilePicture: account.profile_image_url_https.replace("_normal", ""),
      }));

      setFollowingAccounts(accounts);
    } catch (error) {
      console.error("Error fetching followings:", error);
      setFollowingsError(
        "Failed to load followings. Please check the username and try again."
      );
      setSelectedAccounts([]);
    } finally {
      setIsLoadingFollowings(false);
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFollowings();
  };

  const toggleAccount = (handle: string) => {
    if (selectedAccounts.includes(handle)) {
      // Remove account if already selected
      setSelectedAccounts(selectedAccounts.filter((acc) => acc !== handle));
    } else if (selectedAccounts.length < 3) {
      // Add account if less than 3 are selected
      setSelectedAccounts([...selectedAccounts, handle]);
    }
  };

  // Check if current selection differs from applied selection
  const hasChanges = () => {
    if (selectedAccounts.length !== appliedAccounts.length) return true;
    return !selectedAccounts.every((account) =>
      appliedAccounts.includes(account)
    );
  };

  // Handle refetch action
  const handleRefetch = () => {
    if (onRefetch) {
      setIsRefetching(true);

      // Simulate a short delay to show loading state
      setTimeout(() => {
        onRefetch(selectedAccounts);
        setAppliedAccounts([...selectedAccounts]);
        setIsRefetching(false);
      }, 800);
    }
  };

  // Change feed source and reset selections when switching
  const handleFeedSourceChange = (source: FeedSourceType) => {
    if (source !== feedSource) {
      setFeedSource(source);
      setSelectedAccounts([]);
    }
  };

  // Get the currently displayed accounts based on feed source
  const displayedAccounts =
    feedSource === "suggestions" ? suggestedAccounts : followingAccounts;

  return (
    <div className="hidden lg:block w-80 ml-8 h-full">
      {/* Account Selection Section */}
      <div className="bg-gray-800 rounded-xl mb-4">
        <h2 className="text-xl font-bold text-white p-4">
          Select Accounts to Follow
        </h2>

        {/* Feed Source Selector */}
        <div className="px-4 mb-4">
          <div className="flex rounded-lg bg-gray-700 p-1">
            <button
              onClick={() => handleFeedSourceChange("suggestions")}
              className={`flex-1 py-2 text-sm rounded-md ${
                feedSource === "suggestions"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Suggested
            </button>
            <button
              onClick={() => handleFeedSourceChange("followings")}
              className={`flex-1 py-2 text-sm rounded-md ${
                feedSource === "followings"
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Followings
            </button>
          </div>
        </div>

        {/* Username Input for Followings Source */}
        {feedSource === "followings" && (
          <div className="px-4 mb-4">
            <form onSubmit={handleUsernameSubmit} className="flex items-end">
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="text-gray-400 text-xs mb-1 block"
                >
                  Twitter Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    id="username"
                    className={`bg-gray-700 text-white w-full py-2 pl-8 pr-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !isInputValid ? "border border-red-500" : ""
                    }`}
                    placeholder="username"
                    value={followingsUsername}
                    onChange={(e) => setFollowingsUsername(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ml-2 h-[40px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoadingFollowings || !followingsUsername.trim()}
              >
                {isLoadingFollowings ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Fetch"
                )}
              </button>
            </form>
          </div>
        )}

        <p className="px-4 text-gray-400 text-sm mb-3">
          Choose up to 3 accounts to see in your feed
        </p>

        <div className="px-4 mb-3 flex flex-wrap gap-2">
          {selectedAccounts.map((handle) => {
            const account = displayedAccounts.find(
              (acc) => acc.handle === handle
            );
            return account ? (
              <div
                key={account.id}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
              >
                <span>@{account.handle}</span>
                <button
                  onClick={() => toggleAccount(account.handle)}
                  className="ml-2 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : null;
          })}
        </div>

        {/* Account suggestions or followings */}
        <div className="divide-y divide-gray-700">
          {isLoadingFollowings ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : followingsError && feedSource === "followings" ? (
            <div className="p-4 text-center text-red-400">
              {followingsError}
            </div>
          ) : displayedAccounts.length === 0 && feedSource === "followings" ? (
            <div className="p-4 text-center text-gray-400">
              {followingsUsername
                ? "No followings found for this account"
                : "Enter a Twitter username to see their followings"}
            </div>
          ) : (
            displayedAccounts.map((account) => (
              <div
                key={account.id}
                className={`px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center justify-between ${
                  selectedAccounts.includes(account.handle)
                    ? "bg-gray-700 bg-opacity-50"
                    : ""
                }`}
                onClick={() => toggleAccount(account.handle)}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full flex-shrink-0 overflow-hidden relative">
                    <img
                      src={account.profilePicture}
                      alt={`${account.name}'s avatar`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://abs.twimg.com/sticky/default_profile_images/default_profile.png";
                      }}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-white">{account.name}</p>
                    <p className="text-gray-500">@{account.handle}</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    selectedAccounts.includes(account.handle)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500"
                  }`}
                >
                  {selectedAccounts.includes(account.handle) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Status and Refetch Button */}
        <div className="p-4 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            {selectedAccounts.length}/3 accounts selected
          </div>

          {hasChanges() && (
            <button
              onClick={handleRefetch}
              disabled={isRefetching}
              className={`px-4 py-2 rounded-full text-white text-sm font-medium transition ${
                isRefetching
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } flex items-center`}
            >
              {isRefetching ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>Apply Changes</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-xs mt-4 px-4">
        <div className="flex flex-wrap">
          <a href="#" className="mr-2 mb-2 hover:underline">
            Terms of Service
          </a>
          <a href="#" className="mr-2 mb-2 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="mr-2 mb-2 hover:underline">
            Cookie Policy
          </a>
          <a href="#" className="mr-2 mb-2 hover:underline">
            Accessibility
          </a>
          <a href="#" className="mr-2 mb-2 hover:underline">
            Ads info
          </a>
          <a href="#" className="mr-2 mb-2 hover:underline">
            More...
          </a>
        </div>
        <p>© 2025 TeeFeed, Inc.</p>
      </div>
    </div>
  );
}
