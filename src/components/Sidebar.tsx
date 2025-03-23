"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Define account type
interface Account {
  id: string;
  name: string;
  handle: string;
  profilePicture: string;
}

// Props for the sidebar component
interface SidebarProps {
  onAccountsChange?: (accounts: string[]) => void;
  onRefetch?: (accounts: string[]) => void;
}

export default function Sidebar({ onAccountsChange, onRefetch }: SidebarProps) {
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

  // Update parent component when selected accounts change
  useEffect(() => {
    if (onAccountsChange) {
      onAccountsChange(selectedAccounts);
    }
  }, [selectedAccounts, onAccountsChange]);

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

  return (
    <div className="hidden lg:block w-80 ml-8 h-full">
      {/* Account Selection Section */}
      <div className="bg-gray-800 rounded-xl mb-4">
        <h2 className="text-xl font-bold text-white p-4">
          Select Accounts to Follow
        </h2>
        <p className="px-4 text-gray-400 text-sm mb-3">
          Choose up to 3 accounts to see in your feed
        </p>

        <div className="px-4 mb-3 flex flex-wrap gap-2">
          {selectedAccounts.map((handle) => {
            const account = suggestedAccounts.find(
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

        {/* Account suggestions */}
        <div className="divide-y divide-gray-700">
          {suggestedAccounts.map((account) => (
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
          ))}
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
              {isRefetching ? <>Updating...</> : <>Apply Changes </>}
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
        <p>© 2023 TeeFeed, Inc.</p>
      </div>
    </div>
  );
}
