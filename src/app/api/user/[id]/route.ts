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
