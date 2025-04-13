import { OmitKeyof, QueryObserverOptions } from "@tanstack/react-query";

type CachingOptions = {
  staleTime: number; // Time when the cache is considered stale.
  gcTime: number; // Time when the cache is garbage collected.
  refetchOnMount: boolean | "always"; // Refetch the query when the component mounts. Will get cache data if still stale
  refetchOnWindowFocus: boolean; // Refetch the query when the window regains focus
  refetchOnReconnect: boolean; // Refetch the query when the network reconnects
};

const DefaultCachingOptions: CachingOptions = {
  staleTime: 5 * 60 * 1000, //  5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  refetchOnMount: true,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true
};

const DefaultNoCachingOptions: CachingOptions = {
  staleTime: 0,
  gcTime: 0,
  refetchOnMount: "always",
  refetchOnWindowFocus: false,
  refetchOnReconnect: false
};

export const REACT_QUERY_CACHING_OPTIONS = DefaultCachingOptions;
export const REACT_QUERY_NO_CACHING_OPTIONS = DefaultNoCachingOptions;
