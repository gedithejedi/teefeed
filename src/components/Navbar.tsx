"use client";

import {
  FaHome,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaList,
  FaUser,
  FaEllipsisH,
  FaFeatherAlt,
} from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const navItems = [
    { icon: <FaHome size={24} />, text: "Home" },
    // { icon: <FaHashtag size={24} />, text: "Explore" },
    // { icon: <FaBell size={24} />, text: "Notifications" },
    // { icon: <FaEnvelope size={24} />, text: "Messages" },
    // { icon: <FaBookmark size={24} />, text: "Bookmarks" },
    // { icon: <FaList size={24} />, text: "Lists" },
    // { icon: <FaUser size={24} />, text: "Profile" },
    // { icon: <FaEllipsisH size={24} />, text: "More" },
  ];

  return (
    <div className="flex flex-col h-screen justify-between fixed w-20 xl:w-64 px-3">
      <div>
        {/* Logo */}
        <div className="mt-3 mb-2 px-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="font-extrabold">TF</span>
            </div>
            <span className="hidden xl:block text-xl font-bold">TeeFeed</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="mt-5">
          {navItems.map((item, i) => (
            <div
              key={i}
              className={`
                flex items-center text-xl my-3 px-4 py-3 rounded-full 
                hover:bg-gray-800 transition duration-200 cursor-pointer
                ${i === 0 ? "font-bold" : "text-gray-100"}
              `}
            >
              <div>{item.icon}</div>
              <span className="hidden xl:block ml-4">{item.text}</span>
            </div>
          ))}

          {/* <div className="mt-5 w-full">
            <button className="bg-blue-500 text-white w-12 h-12 xl:w-full rounded-full p-3 font-bold hover:bg-blue-600 transition">
              <span className="hidden xl:inline">Tweet</span>
              <span className="inline xl:hidden">
                <FaFeatherAlt />
              </span>
            </button>
          </div> */}
        </nav>
      </div>

      {/* User profile */}
      <div className="mb-4 flex items-center p-3 rounded-full hover:bg-gray-800 cursor-pointer">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <Image
              src="/globe.svg"
              alt="User avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/40";
              }}
            />
          </div>
        </div>
        <div className="hidden xl:block ml-3">
          <p className="font-bold text-white">Unknown User</p>
          <p className="text-gray-500 text-sm">@username</p>
        </div>
        <div className="hidden xl:block ml-auto text-gray-500">
          <FaEllipsisH />
        </div>
      </div>
    </div>
  );
}
