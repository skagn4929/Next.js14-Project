## ~수요일까지 숙제 
### 1. mysql docker 연동 관련 정리
- [벨로그](https://velog.io/@kitree/docker-mysql-%EA%B4%80%EB%A0%A8-%EC%A0%95%EB%A6%AC)에 정리함.

### 2. mysql tsetDB 안에 테이블 만들고 값 데이터 넣어서 프론트엔드로 가져온후 fetch 해보기.
- user 테이블 생성
```sql
CREATE TABLE user (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255)
);
```
---
- 임의의 데이터 값 넣기
```sql
INSERT INTO user (name) VALUES ('kinamhoo'), ('nohsangwoo');
INSERT INTO user (email) VALUES ('ki@naver.com'), ('noh@gmail.com')
```
---
- 프론트엔드로 가져오기
```tsx
// api/dbtest/route.ts

const [rows, fields] = await connection.execute(SELECT name, email FROM user);
```
---
- fetch 하기
```tsx
// page.tsx

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
```
---


### 3. id를 전달받아서 쿼리해보기
- api 폴더 안에 user/[id] 폴더 만들고 route.ts 코드 작성
```ts
// route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: Request, context: any) {
  const { params } = context;

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3308,
    password: "root",
    database: "testDB",
  });

  try {
    // params.id 값이 숫자로 전달되는지 확인
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
      // params.id가 유효한 숫자가 아니면 에러 응답
      return NextResponse.json({
        ok: false,
        msg: "Invalid userId",
      });
    }

    const testquery = `SELECT name, email FROM user WHERE id = ${userId}`;
    const [rows, fields] = await connection.execute(testquery);

    console.log("result is: ", rows);

    return NextResponse.json({
      ok: true,
      msg: "Success response",
      testResult: rows,
    });
  } catch (error: any) {
    console.error("Error executing query:", error);

    return NextResponse.json({
      ok: false,
      msg: "Error executing query",
      error: error.message,
    });
  } finally {
    connection.end();
  }
}
```
이렇게 작성하고 localhost:3000/api/user/1 에 접속하면 아까 만들어둔 데이터에서 id값이 1인 `name:kinamhoo, email:ki@naver.com`이 출력되고, localhost:3000/api/user/2 에 접속하면 id값이 2인 `name:nohsangwoo, email:noh@gmail.com`이 출력되는것을 확인함.

---
- app 폴더 안에 user/[id] 폴더 만들고 page.tsx 코드 작성
```tsx
//page.tsx

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
        const router = window.location.pathname.split("/");
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
  }, []);

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
```
`window.location.pathname`을 사용하여 현재 경로를 가져오고, 이를 기반으로 userId를 추출하여 이에 맞는 Name, Email을 출력함.

---
