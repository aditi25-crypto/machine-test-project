const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE PRODUCT
router.post('/', (req, res) => {
  const { ProductName, CategoryId } = req.body;
  db.query(
    'INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)',
    [ProductName, CategoryId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});

// GET PRODUCTS WITH PAGINATION
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const offset = (page - 1) * size;

  const query = `
    SELECT p.ProductId, p.ProductName, c.CategoryId, c.CategoryName
    FROM products p
    JOIN categories c ON p.CategoryId = c.CategoryId
    LIMIT ? OFFSET ?
  `;

  db.query(query, [size, offset], (err, result) => {
    if (err) return res.status(500).send(err);

    db.query('SELECT COUNT(*) AS total FROM products', (err2, countResult) => {
      if (err2) return res.status(500).send(err2);
      res.send({ data: result, total: countResult[0].total });
    });
  });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  const { ProductName, CategoryId } = req.body;
  db.query(
    'UPDATE products SET ProductName=?, CategoryId=? WHERE ProductId=?',
    [ProductName, CategoryId, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});

// DELETE PRODUCT
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE ProductId=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

module.exports = router;
