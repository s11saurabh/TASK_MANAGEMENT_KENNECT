const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');




const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const statsRoutes = require('./routes/stats');

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend App is running Sucessfully!' });
});



app.use(morgan('dev'));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/stats', statsRoutes);


app.use(errorHandler);

module.exports = app;