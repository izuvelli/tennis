const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// SQLite setup
const db = new sqlite3.Database('data.db');

// Middleware to parse JSON in requests
app.use(bodyParser.json());

// Read the SQL statements from schema.sql
const sqlStatements = fs.readFileSync('schema.sql', 'utf8');

// Function to execute SQL statements for setup
function setupDatabase() {
  db.exec(sqlStatements, (err) => {
    if (err) {
      console.error('Error executing SQL statements:', err);
    } else {
      console.log('Database setup completed');
    }
  });
}

// API endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email } = req.body;

  // Insert data into SQLite database
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error inserting data into the database.' });
    }

    res.json({ success: true, userId: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Call the setupDatabase function when the server starts
  setupDatabase();
});
