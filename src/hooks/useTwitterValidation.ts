import { useMutation } from "@tanstack/react-query";
import { validateTwitterHandle } from "@/services/tweetService";

export function useTwitterValidation() {
  return useMutation({
    mutationFn: validateTwitterHandle,
  });
}
