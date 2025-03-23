import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface TweetSummaryProps {
  summary: string;
}

const TweetSummary: React.FC<TweetSummaryProps> = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 mb-6 border border-indigo-700/50 shadow-lg">
      <h2 className="text-lg font-semibold text-indigo-200 mb-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Feed Summary
      </h2>

      <div className="markdown-content text-gray-300">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-xl font-bold text-indigo-200 mt-4 mb-2"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-lg font-semibold text-indigo-200 mt-3 mb-2"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-md font-semibold text-indigo-300 mt-2 mb-1"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="leading-relaxed mb-3" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-6 mb-3" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal ml-6 mb-3" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            a: ({ node, ...props }) => (
              <a
                className="text-blue-400 hover:text-blue-300 underline"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-indigo-600 pl-4 italic my-3"
                {...props}
              />
            ),
            code: ({ node, ...props }) => (
              <code
                className="block bg-gray-800 p-3 rounded text-sm my-3 overflow-auto"
                {...props}
              />
            ),
            hr: ({ node, ...props }) => (
              <hr className="border-indigo-800 my-4" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-indigo-200" {...props} />
            ),
            em: ({ node, ...props }) => <em className="italic" {...props} />,
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TweetSummary;
