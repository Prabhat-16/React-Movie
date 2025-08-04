import React, { useState } from 'react';

// --- Data ---
// Updated with reliable poster URLs to ensure all images display correctly.
const movieData = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    releaseYear: 2010,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq27gApcjBJU3GZp.jpg',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    genre: 'Action',
    releaseYear: 2008,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 3,
    title: 'Parasite',
    genre: 'Drama',
    releaseYear: 2019,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  },
  {
    id: 4,
    title: 'The Grand Budapest Hotel',
    genre: 'Comedy',
    releaseYear: 2014,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
  },
  {
    id: 5,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    releaseYear: 2014,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    id: 6,
    title: 'Mad Max: Fury Road',
    genre: 'Action',
    releaseYear: 2015,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
  },
   {
    id: 7,
    title: 'Joker',
    genre: 'Drama',
    releaseYear: 2019,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
  },
  {
    id: 8,
    title: 'Knives Out',
    genre: 'Comedy',
    releaseYear: 2019,
    posterUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pThyQovXQrw2m0s9x82twY4l0aL.jpg',
  },
];


// --- Components ---

/**
 * A component that displays a single movie's information.
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the movie.
 * @param {string} props.posterUrl - The URL for the movie's poster image.
 * @param {number} props.releaseYear - The release year of the movie.
 */
function MovieCard({ title, posterUrl, releaseYear }) {
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = `https://placehold.co/300x450/333/FFF?text=Not+Found`;
  };

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={`${title} poster`}
        className="movie-poster"
        onError={handleImageError}
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-release-year">({releaseYear})</p>
      </div>
    </div>
  );
}

/**
 * A component that renders a dropdown for genre selection.
 */
function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="genre-filter">
      <label htmlFor="genre-select">Filter by Genre:</label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="genre-select-dropdown"
      >
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}


// --- Main App Component ---

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleGenreChange = (genre) => {
    setGenreFilter(genre);
  };

  const genres = ['All', ...new Set(movieData.map(movie => movie.genre))];

  const filteredMovies = movieData.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesGenre = genreFilter === 'All' || movie.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    // This div wrapper ensures the dark theme is always applied.
    <div className="dark-mode-app">
      <style>{`
        /* Dark Mode styles are now default */
        :root {
          --bg-color: #121212;
          --card-bg-color: #1e1e1e;
          --text-color: #e4e6eb;
          --secondary-text-color: #b0b3b8;
          --border-color: #3e4042;
          --shadow-color: rgba(0, 0, 0, 0.5);
          --header-bg-color: #1e1e1e;
          --input-bg-color: #3a3b3c;
          --primary-color: #2d88ff;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          background-color: var(--bg-color);
          color: var(--text-color);
        }

        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .app-header {
          background-color: var(--header-bg-color);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px var(--shadow-color);
          margin-bottom: 30px;
          text-align: center;
        }

        .app-header h1 {
          margin: 0 0 20px;
          font-size: 2.5rem;
          color: var(--primary-color);
        }

        .filter-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .search-input, .genre-select-dropdown {
          padding: 10px 15px;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          background-color: var(--input-bg-color);
          color: var(--text-color);
          font-size: 1rem;
        }

        .search-input:focus, .genre-select-dropdown:focus {
          outline: none;
          border-color: var(--primary-color);
        }
        
        .genre-filter label {
            color: var(--secondary-text-color);
        }

        .movie-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 25px;
        }

        .movie-card {
          background-color: var(--card-bg-color);
          border-radius: 8px;
          box-shadow: 0 4px 8px var(--shadow-color);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-color);
        }

        .movie-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px var(--shadow-color);
        }

        .movie-poster {
          width: 100%;
          height: 330px;
          object-fit: cover;
          background-color: #333;
        }

        .movie-info {
          padding: 15px;
          text-align: center;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .movie-title {
          font-size: 1.1rem;
          margin: 0 0 5px;
          color: var(--text-color);
        }

        .movie-release-year {
          font-size: 0.9rem;
          color: var(--secondary-text-color);
          margin: 0;
        }
        
        .no-movies-found {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 1.2rem;
          color: var(--secondary-text-color);
          margin-top: 40px;
        }
      `}</style>
      
      <div className="app-container">
        <header className="app-header">
          <h1>React Movie App</h1>
          <div className="filter-controls">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search for a movie..."
              className="search-input"
            />
            <GenreFilter
              genres={genres}
              selectedGenre={genreFilter}
              onGenreChange={handleGenreChange}
            />
          </div>
        </header>

        <div className="movie-list">
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseYear={movie.releaseYear}
              />
            ))
          ) : (
            <p className="no-movies-found">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
