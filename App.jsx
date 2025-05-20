import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://your-backend-url.onrender.com/api/movies';

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', trailerUrl: '' });

  const fetchMovies = async () => {
    const res = await axios.get(API_URL);
    setMovies(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ title: '', description: '', imageUrl: '', trailerUrl: '' });
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Galería de Películas</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid gap-2">
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} className="border p-2" required />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="border p-2" required></textarea>
        <input name="imageUrl" placeholder="URL de Imagen" value={form.imageUrl} onChange={handleChange} className="border p-2" required />
        <input name="trailerUrl" placeholder="URL del Tráiler (YouTube)" value={form.trailerUrl} onChange={handleChange} className="border p-2" required />
        <button className="bg-blue-500 text-white p-2 rounded">Agregar Película</button>
      </form>

      <div className="grid gap-4">
        {movies.map(movie => (
          <div key={movie._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <img src={movie.imageUrl} alt={movie.title} className="w-full max-h-64 object-cover my-2" />
            <p>{movie.description}</p>
            <div className="mt-2">
              <iframe
                width="100%"
                height="315"
                src={movie.trailerUrl.replace("watch?v=", "embed/")}
                frameBorder="0"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
