import React from "react";
import useFetchBannerMovie from "../../hooks/useFetchBannerMovie";
import "../../assets/styles/Banner.css";

const truncate = (text: string | undefined, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
};

const Banner: React.FC = () => {
  const { movie, loading, error } = useFetchBannerMovie();
  const isMobile = window.matchMedia("(max-width: 400px)").matches; // 400px 이하 여부 확인

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_TMDB_IMG_URL}/t/p/original${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title}</h1>
        <p className="banner_description">
          {isMobile ? truncate(movie?.overview, 50) : movie?.overview}{" "}
          {/* 모바일에서만 truncate */}
        </p>
      </div>
      <div className="banner--fadeBottom" />
    </div>
  );
};

export default Banner;
