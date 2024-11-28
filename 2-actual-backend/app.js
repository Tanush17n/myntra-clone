const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing the cors package

const { getStoredItems, storeItems } = require('./data/items');

const app = express();

app.use(bodyParser.json());

// CORS Configuration
// app.use(cors({
//   origin: 'https://myntra-clone-seven-alpha.vercel.app', // Replace with your frontend URL
//   methods: ['GET', 'POST'], // Allow only specific methods
//   allowedHeaders: ['Content-Type'], // Allow specific headers
// }));

app.use((req, res, next) => {
  const allowedOrigins = [
    'https://myntra-clone-seven-alpha.vercel.app',
    'https://myntra-clone-6kiek16op-tanushs-projects-825c0b1e.vercel.app'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Routes
app.get('/items', async (req, res) => {
  const storedItems = await getStoredItems();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.json({ items: storedItems });
});

app.get('/items/:id', async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post('/items', async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: 'Stored new item.', item: newItem });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
