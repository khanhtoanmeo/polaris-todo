import { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";

function useFetchTodos() {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetching = async () => {
    try {
      setLoading(true);
      const requestConfig = {
        url: "/todos",
      };
      const { data } = await fetchData(requestConfig);
      setFetched(true);
      setTodos(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return { todos, loading, fetched, setTodos };
}

export default useFetchTodos;
