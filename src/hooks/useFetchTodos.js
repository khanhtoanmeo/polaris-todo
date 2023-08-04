import { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";

function useFetchTodos() {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [result, setResult] = useState(null);

  const fetching = async () => {
    try {
      setLoading(true);
      const requestConfig = {
        url: "/todos",
      };
      const { data } = await fetchData(requestConfig);
      setFetched(true);
      setResult(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return { result, loading, fetched, setResult };
}

export default useFetchTodos;
