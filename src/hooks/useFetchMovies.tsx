import { useEffect, useState } from "react";
import { tmdb } from "../utils/URL";
import { Movie } from "../types/Movie";

const useFetchMovies = (category: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        let data;

        switch (category) {
          case "nowPlaying":
            data = await tmdb.getNowPlaying();
            break;
          case "top_rated":
            data = await tmdb.getTop_Rated();
            break;
          case "upcoming":
            data = await tmdb.getUpcoming();
            break;
          default:
            data = await tmdb.fetchMovies(1);
        }

        setMovies(data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [category]);

  return { movies, loading, error };
};

export default useFetchMovies;
