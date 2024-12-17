import React, { useEffect, useState, useCallback } from "react";
import Pagination from "../Pagination";
import "../../assets/styles/MovieGrid.css";
import { toggleWishlist } from "../../utils/toggleWishlist";
import { Movie } from "../../types/Movie";
import MovieItem from "../MovieItem";
import { tmdb } from "../../utils/URL";

const POSTER_WIDTH = 200; // 영화 포스터의 고정 너비 (px)
const POSTER_GAP = 20; // 영화 포스터 간의 간격 (px)
const FIXED_ROWS = 2; // 행은 고정

const PageMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculateMoviesPerPage = useCallback(() => {
    const width = window.innerWidth;
    const columns = Math.floor(
      (width + POSTER_GAP) / (POSTER_WIDTH + POSTER_GAP)
    );
    setMoviesPerPage(columns * FIXED_ROWS);
  }, []);

  const fetchMovies = async (page: number) => {
    try {
      const response = await tmdb.fetchMovies(page);
      if (Array.isArray(response)) {
        setMovies((prevMovies) => {
          const newMovies = response;
          const updatedMovies = [
            ...prevMovies,
            ...newMovies.filter(
              (newMovie) =>
                !prevMovies.some((movie) => movie.id === newMovie.id)
            ),
          ];
          return updatedMovies;
        });
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  useEffect(() => {
    calculateMoviesPerPage();
  }, [calculateMoviesPerPage]);

  useEffect(() => {
    window.addEventListener("resize", calculateMoviesPerPage);
    return () => {
      window.removeEventListener("resize", calculateMoviesPerPage);
    };
  }, [calculateMoviesPerPage]);

  useEffect(() => {
    setLoading(true);
    fetchMovies(currentPage).finally(() => setLoading(false));

    // body에 overflow: hidden 적용
    document.body.style.overflow = "hidden";

    return () => {
      // 컴포넌트가 언마운트될 때 overflow 스타일 초기화
      document.body.style.overflow = "";
    };
  }, [currentPage]);

  return (
    <div className="movie-list-container">
      {loading ? (
        <div className="loading-overlay">
          <p>로딩 중....</p>
        </div>
      ) : (
        <div className="movie-grid-container">
          <div
            className="movie-grid"
            style={{
              gridTemplateColumns: `repeat(${Math.floor(
                (window.innerWidth + POSTER_GAP) / (POSTER_WIDTH + POSTER_GAP)
              )}, ${POSTER_WIDTH}px)`,
              gridTemplateRows: `repeat(${FIXED_ROWS}, auto)`,
              gap: `${POSTER_GAP}px`,
            }}
          >
            {currentMovies.map((movie) => (
              <MovieItem
                movie={movie}
                onToggleWishlist={(movie) =>
                  toggleWishlist(movie, wishlist, setWishlist)
                }
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={30}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default PageMovieList;
