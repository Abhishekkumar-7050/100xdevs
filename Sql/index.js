const express = require('express');
const { connectToDatabase } = require('./connection'); // Adjust the path as necessary

const app = express();

// Call the connectToDatabase function
connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
