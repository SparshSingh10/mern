require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express library
const cors = require('cors'); // Import CORS for handling cross-origin requests
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON
const mongoose = require('mongoose');
const Item = require('./models/Item');

const app = express(); // Create an instance of Express
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

// Default route to fetch and respond with items as JSON
app.get('/', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.json(items); // Respond with items as JSON
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server error'); // Respond with a 500 status code for server error
    }
});

// Home page route to get all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.json(items); // Respond with items as JSON
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server error'); // Respond with a 500 status code for server error
    }
});

// GET route to fetch a single item by ID
app.get('/view/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const item = await Item.findById(id); // Find the item by ID
        if (!item) {
            return res.status(404).send('Item not found'); // Handle case where item doesn't exist
        }
        res.json(item); // Respond with the found item
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).send('Server error'); // Respond with a 500 status code for server error
    }
});

// POST route to handle adding a new item
app.post('/new', async (req, res) => {
    try {
        const newItem = new Item(req.body); // Create a new item instance
        await newItem.save(); // Save the new item to the database
        res.sendStatus(200); // Respond with a 200 status code
    } catch (error) {
        console.error('Error saving product:', error);
        res.sendStatus(500); // Respond with a 500 status code for server error
    }
});

// GET route for editing item details (placeholder)
app.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const item = await Item.findById(id); // Find the item by ID
        if (!item) {
            return res.status(404).send('Item not found'); // Handle case where item doesn't exist
        }
        res.json(item); // Respond with the found item
    } catch (error) {
        console.error('Error fetching item:', error);
        res.sendStatus(500); // Respond with a 500 status code for server error
    }
});

// PATCH route to update an item by ID
app.patch('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from params
        const { imageUrl, price, name, desc } = req.body; // Destructure updated fields

        // Find the item by ID
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).send('Item not found'); // Handle case where item doesn't exist
        }

        // Update only the provided fields
        if (imageUrl !== undefined) item.imageUrl = imageUrl;
        if (price !== undefined) item.price = price;
        if (name !== undefined) item.name = name;
        if (desc !== undefined) item.desc = desc;

        await item.save(); // Save the updated item
        res.json(item); // Return the updated item as JSON
    } catch (error) {
        console.error('Error updating item:', error);
        res.sendStatus(500); // Respond with a 500 status code for server error
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Item.findByIdAndDelete(id); // Adjust this depending on your database
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // Log server running message
});
