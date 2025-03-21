"use client";

import Image from "next/image";
import {
  FaImage,
  FaSmile,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ComposeTweet() {
  return (
    <div className="border-b border-gray-700 p-4">
      <div className="flex">
        <div className="flex-shrink-0 mr-4">
          <Image
            src="/globe.svg"
            alt="Your avatar"
            width={48}
            height={48}
            className="rounded-full"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/48";
            }}
          />
        </div>
        <div className="flex-grow">
          <div className="mb-2">
            <textarea
              className="w-full bg-transparent text-white text-xl outline-none resize-none placeholder-gray-500"
              placeholder="What's happening?"
              rows={3}
            ></textarea>
          </div>

          <div className="flex items-center justify-between border-t border-gray-700 pt-3">
            <div className="flex space-x-4 text-blue-400">
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <FaImage />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <FaSmile />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <FaCalendarAlt />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-500/10">
                <FaMapMarkerAlt />
              </button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
