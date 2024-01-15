import { NextResponse } from "next/server";
import mysql from "mysql2/promise"; // Note: Importing the promise-based version

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
    // let testquery = `select * from post where postId = ${params.id}`;
    // const [rows, fields] = await connection.execute(testquery);

    const [rows, fields] = await connection.execute(
      `select user, host, plugin from user`
    );

    console.log("result is: ", rows);

    return NextResponse.json({
      ok: true,
      msg: "Success response",
      testResult: rows,
    });
  } catch (error) {
    console.error("Error executing query:", error);

    return NextResponse.json({
      ok: false,
      msg: "Error executing query",
    });
  } finally {
    connection.end(); // Ensure the connection is closed, regardless of success or failure.
  }
}
