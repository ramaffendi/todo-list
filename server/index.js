// server/index.js
import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// POST todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const sql = "INSERT INTO todos (text, completed) VALUES (?, ?)";
  db.query(sql, [text, false], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, text, completed: false });
  });
});

// PUT todo (update text or completed)
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const fields = [];
  const values = [];

  if (text !== undefined) {
    fields.push("text = ?");
    values.push(text);
  }
  if (completed !== undefined) {
    fields.push("completed = ?");
    values.push(completed);
  }

  if (fields.length === 0)
    return res.status(400).json({ error: "No data provided" });

  const sql = `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Updated successfully" });
  });
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
