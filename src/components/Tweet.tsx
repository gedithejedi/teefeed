"use client";

import Image from "next/image";
import { FaRegComment, FaRetweet, FaRegHeart, FaUpload } from "react-icons/fa";

interface TweetProps {
  avatar: string;
  username: string;
  handle: string;
  content: string;
  time: string;
  comments: number;
  retweets: number;
  likes: number;
  hasImage?: boolean;
  imageUrl?: string;
}

export default function Tweet({
  avatar,
  username,
  handle,
  content,
  time,
  comments,
  retweets,
  likes,
  hasImage = false,
  imageUrl = "",
}: TweetProps) {
  return (
    <div className="border-b border-gray-700 p-4 hover:bg-gray-800/50 transition cursor-pointer">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={avatar}
            alt={username}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-1">
            <h4 className="font-bold text-white">{username}</h4>
            <span className="text-gray-500">@{handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{time}</span>
          </div>
          <p className="mt-1 text-white">{content}</p>

          {hasImage && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt="Tweet image"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="mt-3 flex justify-between max-w-md">
            <div className="flex items-center text-gray-500 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-400">
                <FaRegComment />
              </div>
              <span className="ml-1 text-sm group-hover:text-blue-400">
                {comments}
              </span>
            </div>
            <div className="flex items-center text-gray-500 group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-400">
                <FaRetweet />
              </div>
              <span className="ml-1 text-sm group-hover:text-green-400">
                {retweets}
              </span>
            </div>
            <div className="flex items-center text-gray-500 group">
              <div className="p-2 rounded-full group-hover:bg-pink-500/10 group-hover:text-pink-400">
                <FaRegHeart />
              </div>
              <span className="ml-1 text-sm group-hover:text-pink-400">
                {likes}
              </span>
            </div>
            <div className="flex items-center text-gray-500 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-400">
                <FaUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
