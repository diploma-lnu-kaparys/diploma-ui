import {
  QueryClient,
  QueryClientProvider,
  QueryKey
} from "@tanstack/react-query";
import { REFRESH_URL } from "./AxiosInterceptor";
import { REACT_QUERY_CACHING_OPTIONS } from "./ReactQueryConfig";
import { useGenericErrorHandler } from "../components/hooks/useGenericErrorHandler";

export type UseReactQueryPropsBase = {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

const MAX_RETRY_COUNT = 3;

/// Query keys that should throw error when failed. Required to trigger `ErrorBoundaryScreen.tsx`.
const QUERY_KEYS_TO_THROW_ERROR: string[] = [
  /* ------ Generic queries ------ */
];

const shouldRetry = (attemptIndex: number, error: any) => {
  if (error?.config?.url?.toLowerCase()?.endsWith(REFRESH_URL.toLowerCase())) {
    return false;
  }
  return attemptIndex < MAX_RETRY_COUNT;
};

const shouldThrowError = (queryKey: QueryKey) => {
  return (
    typeof queryKey[0] === "string" &&
    QUERY_KEYS_TO_THROW_ERROR.includes(queryKey[0])
  );
};

const ReactQueryClient = ({ children }: { children: any }) => {
  const handleGenericError = useGenericErrorHandler({});

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        notifyOnChangeProps: "all",
        ...REACT_QUERY_CACHING_OPTIONS,
        retry: shouldRetry,
        throwOnError: (_, { queryKey }) => shouldThrowError(queryKey)
      },
      mutations: {
        onError: handleGenericError
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryClient;
