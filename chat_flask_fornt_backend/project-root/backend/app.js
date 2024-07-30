const express = require('express');
const connectDB = require('./models/extensions');
const authRoutes = require('./auth/auth');
const profileRoutes = require('./auth/profile');
const cors = require('cors');  // Import cors

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());  // Use cors middleware

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
