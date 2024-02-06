const express = require("express");
const app = express();
const port = 3000;
const pool = require("./db");

app.use(express.json());

app.get("/events", (req, res) => {
  let type = ``;
  if (req.query.type) {
    type = ` WHERE type = '${req.query.type}'`;
    console.log(type);
  }
  pool.query(`SELECT * FROM event_data${type};`, (error, results) => {
    if (error) throw error;
    console.log(`returned all events${type}`);
    return res.status(200).json(results.rows);
  });
});

app.post("/events", (req, res) => {
  const { start_time, end_time, type, description } = req.body;
  pool.query(
    `INSERT (start_time, end_time, type, description INTO event_data VALUES (${start_time}, ${end_time}, ${type}, ${descripton})`,
    (error, results) => {
      if (error) throw error;
      });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`connecting to database at ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`)
});
