import React, { useState, useEffect } from "react";
import { tmdb } from "../../utils/URL";

import { Movie } from "../../types/Movie";
import ScrollGuide from "../ScrollGuide";
import InfiniteScroll from "react-infinite-scroll-component";
import TopButton from "../TopButton";
import MovieList from "../MovieList";
interface MovieListProps {
  genre: string | null;
  rating: number | null;
  sortBy: string;
  sortDirection: string; // 추가
}

const InfiniteMovieList: React.FC<MovieListProps> = ({
  genre,
  rating,
  sortBy,
  sortDirection, // 추가
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [genre, rating, sortBy, sortDirection]);

  // 영화 데이터 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const fetchedMovies = await tmdb.filterMovies({
        page: currentPage,
        genre,
        rating,
        sortBy,
        sortDirection,
        pageSize: 40, // 한 페이지에 40개 항목 요청
      });

      if (fetchedMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...fetchedMovies.results]); // 기존 영화 목록에 새로운 영화 추가
      }
      setLoading(false);
    };

    fetchMovies();
  }, [currentPage, genre, rating, sortBy, sortDirection]);

  // 페이지 변경 핸들러
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
      setCurrentPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };
  return (
    <div className="movie-list-container">
      {/* 스크롤 안내 메시지 컴포넌트 추가 */}
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
        scrollThreshold={1.0} // 스크롤이 끝에 도달할 때만 데이터 로드
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
