const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Railway MySQL Connection
const db = mysql.createConnection({
  host: "acela.proxy.rlwy.net",
  port: 23474,
  user: "root",
  password: "SymhJUIsLQxtKUFewuoiFVKBXegAPYOW",
  database: "railway",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// GET all students
app.get("/students", (req, res) => {
  db.query("SELECT * from studentdb.student s", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET student by id
app.get("/students/:id", (req, res) => {
  db.query(
    "SELECT * FROM student WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    },
  );
});

// CREATE student
app.post("/students", (req, res) => {
  const { first_name, last_name, email, course, age } = req.body;

  db.query(
    "INSERT INTO student(first_name,last_name,email,course,age) VALUES (?,?,?,?,?)",
    [first_name, last_name, email, course, age],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        message: "Student added",
        id: result.insertId,
      });
    },
  );
});

// UPDATE student
app.put("/students/:id", (req, res) => {
  const { first_name, last_name, email, course, age } = req.body;

  db.query(
    `UPDATE student
         SET first_name=?, last_name=?, email=?, course=?, age=?
         WHERE id=?`,
    [first_name, last_name, email, course, age, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Student updated" });
    },
  );
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  db.query("DELETE FROM student WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
