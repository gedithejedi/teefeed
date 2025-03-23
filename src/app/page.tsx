import Tweet from "@/components/Tweet";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ComposeTweet from "@/components/ComposeTweet";
import TweetDisplay from "@/components/TweetDisplay";

// Mock data for tweets
const tweets = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Vitalik Buterin",
    handle: "vitalikbuterin",
    content:
      "Just published a new article on Ethereum scaling solutions. Layer 2 solutions are progressing faster than expected!",
    time: "2h",
    comments: 324,
    retweets: 512,
    likes: 1642,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "Sarah Web3",
    handle: "sarahweb3",
    content:
      "Working on a new token vesting dashboard using @TokenOps. Making it easier for DAOs to manage their token distributions! 📊",
    time: "3h",
    comments: 28,
    retweets: 67,
    likes: 291,
    hasImage: true,
    imageUrl:
      "https://images.unsplash.com/photo-1642964849043-e099903e672c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    username: "CryptoNewsDaily",
    handle: "cryptonews",
    content:
      "BREAKING: Major protocol update announced by the Ethereum Foundation. Gas fees expected to decrease by 30% in the coming months!",
    time: "5h",
    comments: 156,
    retweets: 876,
    likes: 2345,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    username: "DeFi Developer",
    handle: "defidev",
    content:
      "Just deployed my first staking contract! Super excited about the potential of DeFi. #Ethereum #Solidity #Web3",
    time: "6h",
    comments: 42,
    retweets: 118,
    likes: 507,
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    username: "TokenOps",
    handle: "tokenops",
    content:
      "Announcing TokenOps v2.0! Now with multi-chain support for Ethereum, Polygon, Arbitrum, Optimism, and Base. Managing token vesting has never been easier!",
    time: "8h",
    comments: 85,
    retweets: 245,
    likes: 762,
    hasImage: true,
    imageUrl:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  },
];

export default function Home() {
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

          {/* <ComposeTweet /> */}

          <TweetDisplay
            accountHandles={["vitalikbuterin", "sarahweb3"]}
            maxTweetsPerAccount={2}
          />
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
