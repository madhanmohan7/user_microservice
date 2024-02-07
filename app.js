const express = require('express');
const bodyParser = require('body-parser');
const db = require('./user_db');
const userRoutes = require('./router');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Set up user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
