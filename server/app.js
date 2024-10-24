require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express  library or framework type hai ye
const cors = require('cors'); // Import CORS for handling cross-origin requests
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON
const mongoose = require('mongoose');
const Item = require('./models/Item');

const app = express();  //app ke andar ek ebject daal de gi jisme sab method ho ge(dall express function rahe hai par wo object ban jata hai app mai)
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies ,muje bhi nahi pata

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

//home page ka route
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find(); // model item hai na
        res.json(items); // item as josn bej do  taaki waha pe work kar sake
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Server error');
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
        const newItem = new Item(req.body); // Create a new item instance, req.body matlab waha se jo beja ho ga
        await newItem.save(); // Save the new item to the database
        res.sendStatus(200); // Respond with a 200 status code
    } catch (error) {
        console.error('Error saving product:', error);
        res.sendStatus(500); // Respond with a 500 status code for server error
    }
});

// view page mai display karne ke liye placeholder mai details, agar warna iss route ki koi zaroort nahi thi
app.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const item = await Item.findById(id); // Find the item by ID
        if (!item) {
            return res.status(404).send('Item not found'); // Handle case where item doesn't exist
        }
        res.json(item); // Respond with the found item, hamesha ese hi bej te hai
    } catch (error) {
        console.error('Error fetching item:', error);
        res.sendStatus(500); // Respond with a 500 status code for server error
    }
});

// PATCH route to update an item by ID
app.patch('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from params, jo url mai hota hai
        const { imageUrl, price, name, desc } = req.body; // Destructure the updated fields from the request body

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // Log server running message
});
