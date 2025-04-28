import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UserService from "../../services/UserService";

export const CURRENT_USER_QUERY_KEY = "current-user";

export function useUserInfo() {
  const { userId } = useAuth();
  const id = userId ? Number(userId) : null;

  const { data: user, isLoading: currentUserLoading } = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY, id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      if (typeof id !== "number") {
        throw new Error("User ID is missing or invalid");
      }
      return UserService.userInfo(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5
  });

  return { user, currentUserLoading };
}
