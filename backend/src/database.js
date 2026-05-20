const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./jawharat.db", (err) => {
  if (err) {
    console.log("Database Error", err);
  } else {
    console.log("SQLite Connected");
  }
});

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      model TEXT,
      size INTEGER,
      quantity INTEGER,
      price INTEGER,
      image TEXT
    )
  `);

});

module.exports = db;
