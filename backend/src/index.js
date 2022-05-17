import express from 'express';
import mongoose from 'mongoose';
import server from './routes';

const port = process.env.PORT || 8080;

// Set the database connection
const mongodbUrl = 'mongodb://localhost:27017/playerscarddb';
mongoose.connect(mongodbUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully to the database');
});

const app = express();
app.use(server); // The router

app.listen(port, () => console.log(`Backend server running on port ${port}`));
