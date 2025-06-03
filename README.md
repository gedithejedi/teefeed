# 🐦 Teefeed

**Take control of your X feed algorithm**

Teefeed decentralizes the X algorithm, letting you create your own personalized feed based on your interests and chosen accounts. No more algorithmic black boxes - design the feed you actually want to see.

## 🚀 Mission

We believe social media feeds should serve users, not engagement metrics. Teefeed empowers X users to:

- **Design custom feeds** by selecting specific accounts to follow
- **Generate intelligent feed summaries** powered by AI
- **Break free from opaque algorithms** that prioritize engagement over relevance
- **Take charge of what you see** instead of being fed content by mysterious systems

## ✨ Features

- **Custom Account Selection**: Choose up to 3 accounts to curate your personalized feed
- **Feed Summary Generation**: Nilion AI-powered summaries of your curated content
- **Real-time Tweet Fetching**: Live integration with X/Twitter API
- **Suggested vs Following**: Toggle between suggested accounts and your followings
- **Clean, Intuitive Interface**: Focus on content, not distractions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun
- Twitter/X API credentials
- Nilion API key (for summaries)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/teefeed.git
cd teefeed
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Add your API keys:
# TWITTER_API_KEY=your_twitter_api_key
# TWITTER_API_SECRET=your_twitter_api_secret
# OPENAI_API_KEY=your_openai_api_key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see Teefeed in action.

## 🏗️ Project Structure

```
teefeed/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main feed interface
│   └── api/               # API routes for Twitter integration
├── components/             # Reusable React components
│   ├── FeedSummary.tsx    # AI-powered feed summary
│   ├── AccountSelector.tsx # Account selection interface
│   └── TweetCard.tsx      # Individual tweet display
├── lib/                   # Utility functions and configurations
│   ├── twitter.ts         # Twitter API integration
│   └── ai.ts             # AI summary generation
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🎯 How It Works

1. **Account Selection**: Users can search and select up to 3 Twitter accounts to follow
2. **Feed Curation**: Teefeed fetches tweets from selected accounts in real-time
3. **AI Summarization**: Generate intelligent summaries of the curated feed content
4. **Personalized Experience**: Each user gets a unique feed based on their choices

## 🏆 Hackathon Project

This project was built for ETHGlobal hackathon. Check out our submission:

**🔗 [View on ETHGlobal Showcase](https://ethglobal.com/showcase/teefeed-rcq50)**

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy Teefeed is using the [Vercel Platform](https://vercel.com/new).

```bash
npm run build
npm run start
```

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Test with different Twitter accounts and feed configurations
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🔧 Development Guidelines

### Core Principles
- **User-first design**: Always prioritize user control over algorithmic decisions
- **Performance optimization**: Efficient API usage and caching strategies
- **Clean, intuitive UI**: Focus on content readability and ease of use
- **Rate limit awareness**: Respect Twitter API limits and implement proper throttling
- **Responsive design**: Ensure great experience across all devices

## 📚 API Integration

### Twitter API
- Real-time tweet fetching from selected accounts
- User search and account information

### AI Services
- Feed content summarization
- Intelligent content analysis

## 🔗 Links

- **Hackathon Showcase**: [ETHGlobal - Teefeed](https://ethglobal.com/showcase/teefeed-rcq50)
- **Live Demo**: [teefeed.vercel.app](https://teefeed.vercel.app)

---

**Made with ❤️ by the Teefeed team**

*Empowering users to take control of their social media experience*
