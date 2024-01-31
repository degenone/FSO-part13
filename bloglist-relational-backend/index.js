require('dotenv').config();
const express = require('express');

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');
const { errorHandler } = require('./utils/middleware');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorsRouter = require('./controllers/authors');
const readingListRouter = require('./controllers/readingLists');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListRouter);

app.use(errorHandler);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

start();
