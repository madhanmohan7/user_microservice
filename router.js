const express = require('express');
const db = require('./user_db');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

router.post('/', (req, res) => {
  const { name, email, contactNumber, username, password, role, organisation} = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  const stmt = db.prepare('INSERT INTO users ' +
                          '(name, email, contactNumber, username, password, role, organisation) ' +
                          'VALUES (?, ?, ?, ?, ?, ?, ?)');
  stmt.run(name, email, contactNumber, username, password, role, organisation, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User created successfully' });
  });
  stmt.finalize();
});

function validateEmail(email) {
  return email.includes('@');
}

module.exports = router;
