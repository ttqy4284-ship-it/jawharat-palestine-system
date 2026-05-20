const db = require("./database");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    app: "جوهرة فلسطين",
    status: "يعمل بنجاح"
  });
});
app.get("/products", (req, res) => {

  db.all("SELECT * FROM products", [], (err, rows) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }

  });

});


app.post("/products", (req, res) => {

  const { model, size, quantity, price, image } = req.body;

  db.run(
    `
    INSERT INTO products
    (model, size, quantity, price, image)
    VALUES (?, ?, ?, ?, ?)
    `,
    [model, size, quantity, price, image],

    function (err) {

      if (err) {
        res.status(500).json(err);
      } else {

        res.json({
          success: true,
          id: this.lastID
        });

      }

    }
  );

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
