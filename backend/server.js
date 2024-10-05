// index.js
import express from "express";
import pg from "pg";
import cors from "cors";

// Initialize express app
const app = express();
const port = 3000;

app.use(cors());

// PostgreSQL connection pool
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password",
  port: 5432,
});

// Middleware to parse JSON
app.use(express.json());

// Route to fetch news articles from the database
app.get("/news", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM articles ORDER BY published_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching news:", error.message, error.stack); // Log stack trace
    res.status(500).json({ message: "Server Error", error: error.message }); // Send error details in response
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
