import { useState, useEffect } from "react";

import { tmdb } from "../utils/URL";
import { Movie } from "../types/Movie";

const useFetchBannerMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const movies = await tmdb.fetchMovies();
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        setError("Failed to fetch movie data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  return { movie, loading, error };
};

export default useFetchBannerMovie;
