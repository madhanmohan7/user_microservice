const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(':memory:');
const db = new sqlite3.Database('users.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (' +
         'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
         'name TEXT CHECK(length(name) <= 50), ' +
         'email TEXT CHECK(email LIKE "%@%" AND length(email) <= 255), ' +
         'contactNumber TEXT CHECK(length(contactNumber) <= 20), ' +
         'username TEXT UNIQUE CHECK(length(username) <= 25), ' +
         'password TEXT, ' +  
         'role TEXT CHECK(length(role) <= 20), ' +
         'organisation TEXT CHECK(length(organisation) <= 30 AND organisation NOT LIKE "%[0-9]%"))');
});

module.exports = db;
