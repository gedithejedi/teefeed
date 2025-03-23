import { fetchTweetsForAccounts } from "@/services/tweetService";
import { useQuery } from "@tanstack/react-query";

export function useTweets(
  accountHandles: string[],
  maxTweetsPerAccount: number
) {
  return useQuery({
    queryKey: ["tweets", accountHandles, maxTweetsPerAccount],
    queryFn: () => fetchTweetsForAccounts(accountHandles, maxTweetsPerAccount),
    enabled: accountHandles.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
