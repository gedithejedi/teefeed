import { useQuery } from "@tanstack/react-query";
import { fetchTweetsForAccounts } from "@/services/tweetService";

export function useTweets(
  accountHandles: string[],
  maxTweetsPerAccount: number
) {
  return useQuery({
    queryKey: ["tweets", accountHandles, maxTweetsPerAccount],
    queryFn: () => fetchTweetsForAccounts(accountHandles, maxTweetsPerAccount),
    enabled: accountHandles.length > 0,
  });
}
