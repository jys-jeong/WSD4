import React, { useRef, useState, useEffect } from "react";
import useFetchMovies from "../../hooks/useFetchMovies";
import "../../assets/styles/MovieList.css";
import { Movie } from "../../types/Movie";
import { toggleWishlist } from "../../utils/toggleWishlist";
import MovieItem from "../MovieItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface MovieListProps {
  category: string;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ category, title }) => {
  const { movies, loading, error } = useFetchMovies(category);
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true); // 왼쪽 버튼 비활성화 상태
  const [isRightDisabled, setIsRightDisabled] = useState(false); // 오른쪽 버튼 비활성화 상태

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollDistance = window.innerWidth <= 400 ? 260 : 800; // 화면 크기에 따라 scroll 거리 결정
      sliderRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollDistance = window.innerWidth <= 400 ? 260 : 800; // 화면 크기에 따라 scroll 거리 결정
      sliderRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
    }
  };

  // 스크롤 위치 확인 후 버튼 상태 업데이트
  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setIsLeftDisabled(scrollLeft === 0);
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const sliderElement = sliderRef.current; // sliderRef.current 값을 복사

    if (sliderElement) {
      handleScroll(); // 초기 버튼 상태 업데이트
      sliderElement.addEventListener("scroll", handleScroll);

      return () => {
        sliderElement.removeEventListener("scroll", handleScroll); // 복사된 값 사용
      };
    }
  }, [movies]);
  // movies가 업데이트될 때마다 스크롤 상태 체크

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list-container">
      <h2>{title}</h2>
      <div className="movie-slider-wrapper">
        <button
          className="scroll-button left"
          onClick={scrollLeft}
          disabled={isLeftDisabled}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="movie-slider" ref={sliderRef}>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggleWishlist={(movie) =>
                toggleWishlist(movie, wishlist, setWishlist)
              }
            />
          ))}
        </div>
        <button
          className="scroll-button right"
          onClick={scrollRight}
          disabled={isRightDisabled}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
