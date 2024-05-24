const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173', // Remove the trailing slash
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

const createRegistrationsTableQuery = `
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT
  )
`;

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

app.use(express.json());

// post request
app.post('/submit-booking', (req, res) => {
  const {
    selectedCourt,
    selectedRangePicker,
    selectedTimeRange,
    changingRoomNumber,
    changingRoomCode
  } = req.body;

  if (!Array.isArray(selectedRangePicker) || selectedRangePicker.length !== 2) {
    return res.status(400).send('Invalid date range');
  }

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
  const { email, password} = req.body;

  if (!email || !password ) {
    return res.status(400).send('All fields are required');
  }

  const insertQuery = `
    INSERT INTO registrations (email, password)
    VALUES (?, ?)
  `;
  db.run(insertQuery, [email, password], (err) => {
    if (err) {
      console.error('Error inserting registration data:', err);
      res.status(500).send('Error submitting registration');
    } else {
      console.log('Registration data inserted successfully');
      res.status(200).send('Registration submitted successfully');
    }
  });
});

//get request
app.get('/latest-booking', (req, res) => {
  const selectQuery = `SELECT * FROM bookings WHERE id = (SELECT MAX(id) FROM bookings)`;
  db.get(selectQuery, (err, row) => {
    if (err) {
      console.error('Error fetching latest booking:', err);
      res.status(500).send('Error fetching latest booking');
    } else {
      console.log('Latest booking fetched successfully');
      res.json(row);
    }
  });
});

// Route to get the latest registration
app.get('/latest-registration', (req, res) => {
  const selectQuery = `SELECT * FROM registrations WHERE id = (SELECT MAX(id) FROM registrations)`;
  db.get(selectQuery, (err, row) => {
    if (err) {
      console.error('Error fetching latest registration:', err);
      res.status(500).send('Error fetching latest registration');
    } else {
      console.log('Latest registration fetched successfully');
      res.json(row);
    }
  });
});
app.get('/get-booked-slots', (req, res) => {
  const { court, date } = req.query;
  const selectQuery = `SELECT selectedTimeRange FROM bookings WHERE selectedCourt = ? AND selectedRangePickerStart <= ? AND selectedRangePickerEnd >= ?`;
  db.all(selectQuery, [court, date, date], (err, rows) => {
    if (err) {
      console.error('Error fetching booked slots:', err);
      res.status(500).send('Error fetching booked slots');
    } else {
      console.log('Booked slots fetched successfully');
      const bookedSlots = rows.map(row => row.selectedTimeRange);
      res.json({ bookedSlots });
    }
  });
});
app.delete('/delete-latest-booking', (req, res) => {
  const deleteQuery = `DELETE FROM bookings WHERE id = (SELECT MAX(id) FROM bookings)`;
  db.run(deleteQuery, (err) => {
    if (err) {
      console.error('Error deleting latest booking:', err);
      res.status(500).send('Error deleting latest booking');
    } else {
      console.log('Latest booking deleted successfully');
      res.status(200).send('Latest booking deleted successfully');
    }
  });
});
app.delete('/delete-latest-registration', (req, res) => {
  const deleteQuery = `DELETE FROM registrations WHERE id = (SELECT MAX(id) FROM registrations)`;
  db.run(deleteQuery, (err) => {
    if (err) {
      console.error('Error deleting latest registration:', err);
      res.status(500).send('Error deleting latest registration');
    } else {
      console.log('Latest registration deleted successfully');
      res.status(200).send('Latest registration deleted successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
