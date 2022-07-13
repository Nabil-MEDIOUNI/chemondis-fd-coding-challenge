import { useState, useEffect } from 'react';

const useDataFetcher = (getMethod: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getResource() {
    try {
      setLoading(true);
      const result = await getMethod();
      setData(result.data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getResource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading, error];
};

export default useDataFetcher;
