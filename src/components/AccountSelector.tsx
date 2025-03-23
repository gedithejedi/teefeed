"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface AccountSelectorProps {
  onSelectAccounts: (accounts: string[]) => void;
  defaultAccounts: string[];
}

// Popular accounts for demo purposes
const POPULAR_ACCOUNTS = [
  { handle: "SacramentoKings", name: "Sacramento Kings" },
  { handle: "elonmusk", name: "Elon Musk" },
  { handle: "vitalikbuterin", name: "Vitalik Buterin" },
  { handle: "POTUS", name: "President Biden" },
  { handle: "NASA", name: "NASA" },
];

export default function AccountSelector({
  onSelectAccounts,
  defaultAccounts = [],
}: AccountSelectorProps) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedAccounts, setSelectedAccounts] =
    useState<string[]>(defaultAccounts);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const handle = searchInput.trim().replace(/^@/, "");

      // Add the account even if validation fails or succeeds
      const newSelectedAccounts = [...selectedAccounts];
      if (!newSelectedAccounts.includes(handle)) {
        newSelectedAccounts.push(handle);
        setSelectedAccounts(newSelectedAccounts);
        onSelectAccounts(newSelectedAccounts);
      }

      // Reset input after search
      setSearchInput("");
    }
  };

  const toggleAccount = (account: string) => {
    const newSelectedAccounts = [...selectedAccounts];

    if (newSelectedAccounts.includes(account)) {
      // Remove account if already selected
      const index = newSelectedAccounts.indexOf(account);
      newSelectedAccounts.splice(index, 1);
    } else {
      // Add account if not already selected
      newSelectedAccounts.push(account);
    }

    setSelectedAccounts(newSelectedAccounts);
    onSelectAccounts(newSelectedAccounts);
  };

  return (
    <div className="border-b border-gray-700 p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Twitter handle..."
            className="bg-transparent border-none focus:outline-none text-white w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-full font-bold hover:bg-blue-600 ml-2 disabled:opacity-50"
          >
            {"View"}
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-gray-400 font-bold mb-2">Suggested Accounts:</h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_ACCOUNTS.map((account) => (
            <button
              key={account.handle}
              onClick={() => toggleAccount(account.handle)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedAccounts.includes(account.handle)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              @{account.handle}
            </button>
          ))}
        </div>
      </div>

      {selectedAccounts.length > 0 && (
        <div className="mt-2 text-sm text-gray-400">
          Showing tweets from {selectedAccounts.length} account
          {selectedAccounts.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
