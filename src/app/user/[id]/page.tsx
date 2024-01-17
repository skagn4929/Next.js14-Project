"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface ApiResponse {
  ok: boolean;
  msg: string;
  testResult: { name: string; email: string }[];
}

interface UserPageProps {
  data: ApiResponse | null;
}

const UserPage: NextPage<UserPageProps> = ({ data }) => {
  const [userData, setUserData] = useState<ApiResponse | null>(data);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const router = window.location.pathname.split("/"); // 라우터 정보 가져오기
        const userId = parseInt(router[router.length - 1], 10);

        if (isNaN(userId)) {
          throw new Error("Invalid userId");
        }

        const response = await fetch(
          `http://localhost:3000/api/user/${userId}`
        );
        const fetchedData: ApiResponse = await response.json();
        setUserData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData({
          ok: false,
          msg: "Error fetching data",
          testResult: [],
        });
      }
    };

    fetchUserData();
  }, []); // useEffect 의존성 없음

  if (!userData || !userData.ok) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>User page</h1>
      <p>ID: {window.location.pathname.split("/").pop()}</p>
      <p>Name: {userData.testResult[0]?.name}</p>
      <p>Email: {userData.testResult[0]?.email}</p>
    </div>
  );
};

export default UserPage;
