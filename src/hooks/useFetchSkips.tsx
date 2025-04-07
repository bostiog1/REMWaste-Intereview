import { useState, useEffect, useCallback } from "react";
import {
  getCapacityEstimate,
  getSuitabilityEstimate,
  getWarnings,
} from "../utils/skipUtils";
import { Skip } from "../types/skip.types";

interface FetchResult {
  data: Skip[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetchSkips = (url: string): FetchResult => {
  const [data, setData] = useState<Skip[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkipData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      const transformedData: Skip[] = jsonData.map((skip: any) => ({
        id: skip.id,
        size: skip.size,
        price: (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2),
        hirePeriod: skip.hire_period_days,
        capacity: getCapacityEstimate(skip.size),
        suitableFor: getSuitabilityEstimate(skip.size),
        warnings: getWarnings(skip),
        allowed_on_road: skip.allowed_on_road,
        allows_heavy_waste: skip.allows_heavy_waste,
      }));

      setData(transformedData);
      setLoading(false);
    } catch (e: any) {
      setError(e.message || "An error occurred while fetching skip data");
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchSkipData();
  }, [fetchSkipData]);

  return { data, loading, error, refetch: fetchSkipData };
};

export default useFetchSkips;
