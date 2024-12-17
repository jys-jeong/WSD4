// InfiniteMovieList.tsx
import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL";
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "../TopButton";
import MovieList from "../MovieList"; // Import the new MovieList component
import { Movie } from "../../types/Movie";

import ScrollGuide from "../ScrollGuide";
import "../../assets/styles/Infinite.css";

const InfiniteMovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedMovies = await tmdb.fetchMovies(page);

      if (fetchedMovies.length === 0) {
        setHasMore(false);
      }

      // Add only non-duplicate movies
      setMovies((prevMovies) => {
        const newMovies = fetchedMovies.filter(
          (movie: Movie) =>
            !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setLoading(false);
    };

    fetchMovies();
  }, [page]);

  // Show 'Back to Top' button
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

export default InfiniteMovieList;
