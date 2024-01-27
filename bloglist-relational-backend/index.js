require('dotenv').config();
const express = require('express');

const blogRouter = require('./controllers/blogs');
const { connectToDatabase } = require('./utils/db');
const { PORT } = require('./utils/config');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogRouter);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

start();
