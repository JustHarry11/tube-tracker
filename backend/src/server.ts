import dotenv from "dotenv";
import app from "./app";
import { pool } from "./db/pool";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected:", result.rows[0]);

    const dbName = await pool.query(
      "SELECT current_database()"
    );

    console.log("Current database:", dbName.rows[0]);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();