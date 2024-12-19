// src/components/MovieList.tsx
import React from "react";

interface MovieListProps {
  movies: {
    id: number;
    title: string;
    poster_path: string;
  }[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "10px",
      }}
    >
      {movies.map((movie) => (
        <div key={movie.id} style={{ textAlign: "center" }}>
          <img
            src={`${process.env.REACT_APP_TMDB_IMG_URL}/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "150px", height: "225px" }}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
