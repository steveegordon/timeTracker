const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
  pool.query("SELECT * FROM event_data", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});
app.listen(port, () => {console.log(`app listening on port ${port}`);});