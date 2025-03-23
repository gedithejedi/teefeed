"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TweetDisplay from "@/components/TweetDisplay";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([
    "NBA",
    "VitalikButerin",
    "web3daily",
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto flex">
        <div className="w-20 xl:w-64 flex-shrink-0">
          <Navbar />
        </div>

        <main className="flex-grow border-l border-r border-gray-700 max-w-xl">
          <header className="sticky top-0 z-10 bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="p-4 border-b border-gray-700">
              <h1 className="text-xl font-bold">TeeFeed</h1>
            </div>
          </header>

          <TweetDisplay
            accountHandles={selectedAccounts}
            maxTweetsPerAccount={5}
          />
        </main>

        <Sidebar onRefetch={setSelectedAccounts} />
      </div>
    </div>
  );
}
