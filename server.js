const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors'); // Add this line

connectDB();

const app = express();
const port = 3000;

app.use(cors()); // Add this line

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error Handling Middleware should be after all routes
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
