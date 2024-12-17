// InfiniteMovieListWrapper.tsx
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "./TopButton";
import ScrollGuide from "./ScrollGuide";
import MovieList from "./MovieList";
import { Movie } from "../types/Movie";

// Generic Infinite Movie List Component
interface InfiniteMovieListWrapperProps {
  fetchMovies: (page: number, filters?: any) => Promise<any>; // Function to fetch movies
  filters?: any; // Optional filters for fetching movies (genre, rating, etc.)
  pageSize?: number; // Optional page size
}

const InfiniteMovieListWrapper: React.FC<InfiniteMovieListWrapperProps> = ({
  fetchMovies,
  filters = {},
  pageSize = 20,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  // Fetch movies from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedMovies = await fetchMovies(page, { ...filters, pageSize });

      if (fetchedMovies.length === 0) {
        setHasMore(false);
      }

      setMovies((prevMovies) => {
        const newMovies = fetchedMovies.filter(
          (movie: Movie) =>
            !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setLoading(false);
    };

    fetchData();
  }, [page, filters, fetchMovies, pageSize]);

  // Scroll-to-top button visibility
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch more data on scroll
  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="movie-list-container">
      <ScrollGuide />

      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          loading && (
            <div className="loading-overlay">
              <p>로딩 중....</p>
            </div>
          )
        }
        scrollThreshold={1.0}
        endMessage={<p>No more movies</p>}
      >
        <MovieList
          movies={movies}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      </InfiniteScroll>

      {showTopButton && <TopButton />}
    </div>
  );
};

export default InfiniteMovieListWrapper;
