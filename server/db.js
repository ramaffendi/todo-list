// server/db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // sesuaikan dengan MySQL kamu
  password: "", // sesuaikan
  database: "todo_app", // pastikan sudah dibuat
});

db.connect((err) => {
  if (err) throw err;
  console.log("Terhubung ke MySQL!");
});

export default db;
