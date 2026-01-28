const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Backend API is running 🚀');
});

// Routes
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/products', require('./routes/productRoutes'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
