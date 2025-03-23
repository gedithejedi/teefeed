export default function Sidebar() {
  return (
    <div className="hidden lg:block w-80 ml-8 h-full">
      {/* Search */}
      {/* <div className="sticky top-0 bg-black py-2 z-10">
        <div className="bg-gray-800 rounded-full px-4 py-2 flex items-center">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search Twitter"
            className="bg-transparent border-none focus:outline-none text-white ml-2 w-full"
          />
        </div>
      </div> */}

      {/* Trending section */}
      {/* <div className="bg-gray-800 rounded-xl mt-4">
        <h2 className="text-xl font-bold text-white p-4">Trends for you</h2>

        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
            <p className="text-xs text-gray-500">Trending in Technology</p>
            <p className="font-bold text-white">
              #{["Web3", "JavaScript", "React", "NextJS"][i]}
            </p>
            <p className="text-xs text-gray-500">{`${Math.floor(
              Math.random() * 100
            )}K Tweets`}</p>
          </div>
        ))}

        <div className="p-4 text-blue-400 hover:bg-gray-700 cursor-pointer rounded-b-xl">
          Show more
        </div>
      </div> */}

      {/* Who to follow */}
      {/* <div className="bg-gray-800 rounded-xl mt-4">
        <h2 className="text-xl font-bold text-white p-4">Who to follow</h2>

        {[
          { name: "TokenOps", handle: "tokenops" },
          { name: "Web3 Updates", handle: "web3updates" },
          { name: "Blockchain Daily", handle: "blockchaindaily" },
        ].map((user, i) => (
          <div
            key={i}
            className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex-shrink-0"></div>
              <div className="ml-3">
                <p className="font-bold text-white">{user.name}</p>
                <p className="text-gray-500">@{user.handle}</p>
              </div>
            </div>
            <button className="bg-white text-black px-4 py-1 rounded-full font-bold text-sm hover:bg-opacity-90">
              Follow
            </button>
          </div>
        ))}

        <div className="p-4 text-blue-400 hover:bg-gray-700 cursor-pointer rounded-b-xl">
          Show more
        </div>
      </div> */}

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
