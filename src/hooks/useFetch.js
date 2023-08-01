import { useCallback } from "react";
import { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";

function useFetch(url, onLoad) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetching = useCallback(async () => {
    setLoading(true);
    const requestConfig = {
      url,
    };
    const data = await fetchData(requestConfig);
    setResult(data);
    if (data.data) {
      onLoad(data.data);
    }
    setLoading(false);
  }, [url, onLoad]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  return { result, loading };
}

export default useFetch;
