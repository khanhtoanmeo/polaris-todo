const BASE_URL = "http://localhost:8888/api";

async function fetchData({
  url = BASE_URL,
  method = "get",
  data = {},
  isFetchApi = true,
}) {
  const fetchUrl = isFetchApi ? BASE_URL + url : url;
  console.log(data);
  const requestConfig = {
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(fetchUrl, method === "get" ? {} : requestConfig);
  return res.json();
}

export default fetchData;
