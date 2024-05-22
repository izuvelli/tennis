const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173/', // Allow requests from example.com
};

const db = new sqlite3.Database('database.db');

// Enable CORS for all routes
app.use(cors(corsOptions));

// Define schema for the bookings table
const createBookingsTableQuery = `
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    selectedCourt TEXT,
    selectedRangePickerStart TEXT,
    selectedRangePickerEnd TEXT,
    selectedTimeRange TEXT,
    changingRoomNumber INTEGER,
    changingRoomCode TEXT
  )
`;

// Define schema for the registrations table
const createRegistrationsTableQuery = `
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    nickname TEXT,
    phone TEXT,
    gender TEXT
  )
`;

// Create tables if they don't exist
db.run(createBookingsTableQuery, (err) => {
  if (err) {
    console.error('Error creating bookings table:', err);
  } else {
    console.log('Bookings table created successfully');
  }
});

db.run(createRegistrationsTableQuery, (err) => {
  if (err) {
    console.error('Error creating registrations table:', err);
  } else {
    console.log('Registrations table created successfully');
  }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submissions for bookings
app.post('/submit-booking', (req, res) => {
  const { selectedCourt, 'selected-range-picker': selectedRangePicker, 'selected-time-range': selectedTimeRange, 'changing-room-number': changingRoomNumber, 'changing-room-code': changingRoomCode } = req.body;

  const [selectedRangePickerStart, selectedRangePickerEnd] = selectedRangePicker;

  const insertQuery = `
    INSERT INTO bookings (selectedCourt, selectedRangePickerStart, selectedRangePickerEnd, selectedTimeRange, changingRoomNumber, changingRoomCode)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(insertQuery, [selectedCourt, selectedRangePickerStart, selectedRangePickerEnd, selectedTimeRange, changingRoomNumber, changingRoomCode], (err) => {
    if (err) {
      console.error('Error inserting booking data:', err);
      res.status(500).send('Error submitting booking');
    } else {
      console.log('Booking data inserted successfully');
      res.status(200).send('Booking submitted successfully');
    }
  });
});

// Route to handle form submissions for registrations
app.post('/submit-registration', (req, res) => {
  const { email, password, nickname, phone, gender } = req.body;

  const insertQuery = `
    INSERT INTO registrations (email, password, nickname, phone, gender)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(insertQuery, [email, password, nickname, phone, gender], (err) => {
    if (err) {
      console.error('Error inserting registration data:', err);
      res.status(500).send('Error submitting registration');
    } else {
      console.log('Registration data inserted successfully');
      res.status(200).send('Registration submitted successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
