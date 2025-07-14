import { useState, useEffect, useCallback, useRef } from "react";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// In-memory cache for client-side
const clientCache = new Map();
const CLIENT_CACHE_TTL = 2 * 60 * 1000; // 2 minutes

// Debug counters
let cacheHits = 0;
let apiCalls = 0;

function getCacheKey(filters, translation) {
  return JSON.stringify({ filters, translation });
}

function isCacheValid(timestamp) {
  return Date.now() - timestamp < CLIENT_CACHE_TTL;
}

export function useFilteredData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const debounceTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);
  const [lastDebounceTime, setLastDebounceTime] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(false);
  const previousDataRef = useRef([]);

  const fetchFilteredData = useCallback(
    async (filters, translation) => {
      console.log("🚀 Making API call...", { filters, timestamp: Date.now() });
      apiCalls++;

      // Cancel previous request
      if (abortControllerRef.current) {
        console.log("❌ Cancelling previous request");
        abortControllerRef.current.abort();
      }

      // Check cache first
      const cacheKey = getCacheKey(filters, translation);
      const cached = clientCache.get(cacheKey);

      if (cached && isCacheValid(cached.timestamp)) {
        console.log("⚡ Cache hit! Returning cached data");
        cacheHits++;

        // Smooth transition to cached data
        setIsTransitioning(true);
        setTimeout(() => {
          setData(cached.data);
          setLoading(false);
          setError(null);
          setPendingRequests(false);
          setIsTransitioning(false);
        }, 150); // Small delay for smooth transition
        return;
      }

      console.log("💾 Cache miss, fetching from API...");

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      setPendingRequests(true);

      try {
        setLoading(true);
        setError(null);

        // Keep previous data visible during loading
        previousDataRef.current = data;

        const response = await fetch(
          `${BACKEND_BASE_URL}/api/filtered-sheets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ filters, translation }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.error) {
          throw new Error(result.error);
        }

        console.log("✅ API call successful, caching result");

        // Sort the data by date
        const sortedData = result.data
          .map((playgroup) => {
            const eventDate = playgroup.eventDate
              ? new Date(playgroup.eventDate).toISOString().split("T")[0]
              : "";
            return { ...playgroup, eventDate };
          })
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        // Cache the result
        clientCache.set(cacheKey, {
          data: sortedData,
          timestamp: Date.now(),
        });

        // Smooth transition to new data
        setIsTransitioning(true);
        setTimeout(() => {
          setData(sortedData);
          setError(null);
          setIsTransitioning(false);
        }, 200); // Slightly longer delay for API results
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("🚫 Request was cancelled");
          // Request was cancelled, don't update state
          return;
        }
        console.error("❌ API call failed:", err.message);
        setError(err.message || "Failed to fetch filtered data");
        setData([]);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
        setPendingRequests(false);
      }
    },
    [data]
  );

  const updateFilters = useCallback(
    (filters, translation) => {
      console.log("🔄 Filter update requested:", {
        filters,
        timestamp: Date.now(),
      });

      // Clear previous timeout
      if (debounceTimeoutRef.current) {
        console.log("⏰ Clearing previous debounce timeout");
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set loading immediately for better UX, but keep current data visible
      setLoading(true);
      setError(null);

      // Debounce the API call
      debounceTimeoutRef.current = setTimeout(() => {
        console.log("⏰ Debounce timeout fired, making API call");
        setLastDebounceTime(Date.now());
        fetchFilteredData(filters, translation);
      }, 300); // 300ms debounce
    },
    [fetchFilteredData]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data: isTransitioning ? previousDataRef.current : data, // Show previous data during transition
    loading,
    error,
    updateFilters,
    isInitialLoad,
    debugInfo: {
      lastDebounceTime,
      cacheHits,
      apiCalls,
      pendingRequests,
    },
  };
}
