import express from "express";
import cors from "cors";

import express from 'express';
import db from './config/db.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Ejemplo: traer todos los productos
app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});