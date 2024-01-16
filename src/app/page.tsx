"use client";

import { useEffect, useState } from "react";

interface ApiResponse {
  ok: boolean;
  msg: string;
  testResult: { name: string }[];
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출 코드
        const response = await fetch("/api/dbtest");
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Main page</h1>
      <div>
        {data && data.ok ? (
          <div>
            <p>Data from API:</p>
            <ul>
              {data.testResult.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Error fetching data from API</p>
        )}
      </div>
    </div>
  );
}
