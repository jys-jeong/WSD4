import React, { useEffect, useState } from "react";
import { Movie, MovieItemProps } from "../types/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const MovieItem: React.FC<MovieItemProps> = ({ movie, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  // 로컬 스토리지에서 wishlist를 확인하여 해당 영화가 있는지 확인
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.some((item: Movie) => item.id === movie.id)); // 영화 ID로 비교
  }, [movie.id]);

  const handleToggleWishlist = () => {
    onToggleWishlist(movie);
    setIsInWishlist((prev) => !prev); // 클릭 시 상태 토글
  };

  return (
    <div className="movie-item">
      {/* 영화 포스터 클릭 시 wishlist 추가/삭제 */}
      <img
        src={`${process.env.REACT_APP_TMDB_IMG_URL}/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={handleToggleWishlist}
      />

      {/* 영화 정보 오버레이 */}
      {/* 북마크 아이콘 (wishlist에 있을 경우 표시) */}
      {isInWishlist && (
        <FontAwesomeIcon
          icon={faBookmark}
          size="2x"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#e50914", // 원하는 색상으로 변경
          }}
        />
      )}
      <div className="movie-overlay" onClick={handleToggleWishlist}>
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-rating">
          평점 {Math.round(movie.vote_average * 10) / 10}
        </p>
        {isInWishlist && (
          <FontAwesomeIcon
            icon={faBookmark}
            size="2x"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#e50914", // 원하는 색상으로 변경
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MovieItem;
