const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Movie model
const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  trailerUrl: String
}));

// Routes
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/api/movies', async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.status(201).json(newMovie);
});

app.put('/api/movies/:id', async (req, res) => {
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedMovie);
});

app.delete('/api/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
