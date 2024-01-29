require('dotenv').config();
const express = require('express');

const blogRouter = require('./controllers/blogs');
const { connectToDatabase } = require('./utils/db');
const { PORT } = require('./utils/config');
const { errorHandler } = require('./utils/middleware');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

start();
