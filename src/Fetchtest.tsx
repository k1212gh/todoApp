import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
}

function useFetch(url: string) {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
