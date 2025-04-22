import React from "react";
import useAuth from "./useAuth";
import { useQueryClient } from "@tanstack/react-query";

interface UseLogoutProps {
  returnUrl?: string;
}

/**
 * Hook to perform logout: clears auth context, cache, and redirects.
 * @param returnUrl Optional URL to redirect to after logout (default: reload page).
 */
export function useLogout({ returnUrl }: UseLogoutProps = {}) {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return React.useCallback(() => {
    logout().finally(() => {
      queryClient.clear();
      if (returnUrl) {
        window.location.assign(returnUrl);
      } else {
        window.location.reload();
      }
    });
  }, [logout, queryClient, returnUrl]);
}
