const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Database connection
const dbPath = path.join(__dirname, "inquiries.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database");
    initializeDatabase();
  }
});

// Initialize database table
function initializeDatabase() {
  db.run(
    `CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_name TEXT NOT NULL,
      email TEXT NOT NULL,
      business_number TEXT NOT NULL,
      inquiry TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Table creation error:", err);
      } else {
        console.log("Inquiries table ready");
      }
    }
  );
}

// API endpoint to submit inquiry
app.post("/api/inquiries", (req, res) => {
  const { businessName, email, businessNumber, inquiry } = req.body;

  // Validate input
  if (!businessName || !email || !businessNumber || !inquiry) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    db.run(
      "INSERT INTO inquiries (business_name, email, business_number, inquiry) VALUES (?, ?, ?, ?)",
      [businessName, email, businessNumber, inquiry],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({
            message: "Inquiry submitted successfully!",
            id: this.lastID,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to get all inquiries
app.get("/api/inquiries", (req, res) => {
  db.all("SELECT * FROM inquiries ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// API endpoint to get single inquiry
app.get("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM inquiries WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Inquiry not found" });
    } else {
      res.json(row);
    }
  });
});

// Serve index.html for all other routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"), (err) => {
    if (err) {
      res.status(500).send("Error loading page");
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("POST /api/inquiries - Submit an inquiry");
  console.log("GET /api/inquiries - Get all inquiries");
  console.log("GET /api/inquiries/:id - Get inquiry by ID");
});