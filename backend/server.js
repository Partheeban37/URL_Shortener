// backend/server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const crypto = require('crypto'); // Used to generate unique short codes

const app = express();
const port = 5000;

// Configure CORS to allow requests from the frontend
app.use(cors());
app.use(express.json()); // Enable body parsing for JSON

// Database connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// A function to create the URL mapping table if it doesn't exist
async function setupDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        long_url TEXT NOT NULL,
        short_code VARCHAR(10) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("URL table created or already exists.");
  } catch (err) {
    console.error("Failed to set up the database table:", err);
  } finally {
    client.release();
  }
}
setupDatabase();

// ----------------------
// Health check endpoint
// ----------------------
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API endpoint to shorten a URL
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: 'longUrl is required' });
  }

  // Generate a simple, unique short code
  const shortCode = crypto.randomBytes(4).toString('hex');

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO urls(long_url, short_code) VALUES($1, $2) RETURNING short_code',
      [longUrl, shortCode]
    );
    client.release();
    const newShortCode = result.rows[0].short_code;
    res.json({ shortUrl: `http://localhost:5000/${newShortCode}` });
  } catch (err) {
    console.error('Database insertion error:', err.stack);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// Endpoint to handle redirection from a short URL
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT long_url FROM urls WHERE short_code = $1',
      [shortCode]
    );
    client.release();

    if (result.rows.length > 0) {
      const longUrl = result.rows[0].long_url;
      res.redirect(longUrl);
    } else {
      res.status(404).send('Short URL not found');
    }
  } catch (err) {
    console.error('Database query error:', err.stack);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Backend API for URL Shortener listening at http://localhost:${port}`);
});
