const express = require('express');
const connectDB = require('./models/extensions');
const authRoutes = require('./auth/auth');
const profileRoutes = require('./auth/profile');
const cors = require('cors');
const chatgptRoutes = require('./ChatGBT/views');
const bodyParser = require('body-parser');
const debug = require('debug')('app:server');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', chatgptRoutes);

app.post('/notify_alive', (req, res) => {
    console.log('Received notification from Python server');
    res.status(200).send('Notification received');
});

app.post('/notify_dead', (req, res) => {
    console.log('Received death notification from Python server');
    res.status(200).send('Death notification received');
    // Optionally, you can add logic here to handle the situation when Python server is down
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => debug(`Server started on port ${PORT} in ${process.env.DEBUG ? 'DEBUG' : 'PRODUCTION'} mode`));
