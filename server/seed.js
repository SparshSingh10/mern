require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Item = require('./models/Item'); // Import your Item model

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
        seedItems(); // Start seeding items after connection
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit on error
    });

// Function to seed items
const seedItems = async () => {
    const items = [
        {
            name: "Laptop",
            price: 999.99,
            desc: "High-performance laptop for gaming and work",
            imageUrl: "https://images.unsplash.com/photo-1585026938576-1e29e7f10c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDN8fGxhcHRvcHxlbnwwfHx8fDE2ODQ4NzI4OTc&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Smartphone",
            price: 799.99,
            desc: "Latest smartphone with advanced features",
            imageUrl: "https://images.unsplash.com/photo-1606796268015-33abf78d52c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fHNtYXJ0cGhvbmV8ZW58MHx8fHwxNjg0ODcyODc4&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Headphones",
            price: 199.99,
            desc: "Noise-cancelling over-ear headphones",
            imageUrl: "https://images.unsplash.com/photo-1547891975-03d05129b886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEyfHx0ZWxldGFsaXxlbnwwfHx8fDE2ODQ4NzI4OTk&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Watch",
            price: 249.99,
            desc: "Stylish smartwatch with health tracking",
            imageUrl: "https://images.unsplash.com/photo-1528150663175-4560778d82ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDIyfHN3YXRjaHxlbnwwfHx8fDE2ODQ4NzI5MDA&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Camera",
            price: 499.99,
            desc: "Professional camera for photography enthusiasts",
            imageUrl: "https://images.unsplash.com/photo-1542744095-e39a7a0a20c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDl8fGNhbWVyfGVufDB8fHx8MTY4NDg3MjkwMQ&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Tablet",
            price: 599.99,
            desc: "Versatile tablet for work and play",
            imageUrl: "https://images.unsplash.com/photo-1586471200642-68c4d6bcd6f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE0fHx0YWJsZXQlMjB0YWJsZXR8ZW58MHx8fHwxNjg0ODcyOTAy&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Backpack",
            price: 89.99,
            desc: "Durable backpack for travel and daily use",
            imageUrl: "https://images.unsplash.com/photo-1561605800-9c539d90c08a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDl8fGJhY2twYWNrJTIwcGFja3xlbnwwfHx8fDE2ODQ4NzI5MTc&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Wireless Charger",
            price: 29.99,
            desc: "Fast wireless charger for your devices",
            imageUrl: "https://images.unsplash.com/photo-1594000776638-0981686edc37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEyMnx8d2lyZWxlc3MlMjBjaGFyZ2V8ZW58MHx8fHwxNjg0ODcyOTMw&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Bluetooth Speaker",
            price: 79.99,
            desc: "Portable Bluetooth speaker with great sound",
            imageUrl: "https://images.unsplash.com/photo-1533492198020-4f6c7f2d6f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI0fHxibHVldXRvb3RoJTIwc3BlYWtlcnxlbnwwfHx8fDE2ODQ4NzI5Mzg&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Game Console",
            price: 499.99,
            desc: "Next-gen gaming console for ultimate gaming experience",
            imageUrl: "https://images.unsplash.com/photo-1609308744875-792118ee0582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDkwfHxkZXNrdG9wJTIwY29uc29sZXxlbnwwfHx8fDE2ODQ4NzI5NjM&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Keyboard",
            price: 49.99,
            desc: "Mechanical keyboard for enhanced typing experience",
            imageUrl: "https://images.unsplash.com/photo-1588051678812-f8ed25d0487f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fG1lY2hhbmljJTIya2V5Ym9hcmR8ZW58MHx8fHwxNjg0ODcyOTg0&ixlib=rb-1.2.1&q=80&w=400"
        },
        {
            name: "Smart Home Speaker",
            price: 99.99,
            desc: "Smart speaker with voice assistant",
            imageUrl: "https://images.unsplash.com/photo-1585767482557-bc162e5daeb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHNtb3J0JTIwaG9tZXxlbnwwfHx8fDE2ODQ4NzI5OTU&ixlib=rb-1.2.1&q=80&w=400"
        }
    ];

    // Insert items into the database
    try {
        await Item.deleteMany({}); // Clear existing items
        await Item.insertMany(items); // Insert new items
        console.log('Items seeded successfully!');
    } catch (error) {
        console.error('Error seeding items:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};
