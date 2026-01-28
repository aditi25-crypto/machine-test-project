const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { CategoryName } = req.body;
  db.query('INSERT INTO categories (CategoryName) VALUES (?)', [CategoryName], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// READ
router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { CategoryName } = req.body;
  db.query('UPDATE categories SET CategoryName=? WHERE CategoryId=?', [CategoryName, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM categories WHERE CategoryId=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

module.exports = router;
