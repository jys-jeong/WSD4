import React from "react";
import MovieList from "../components/home/MovieList";
import Banner from "../components/home/Banner";
import Header from "../components/Header";
const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <Banner />
      <MovieList category="popular" title="인기 영화" />
      <MovieList category="nowPlaying" title="현재 상영중" />
      <MovieList category="top_rated" title="평점 높은 영화" />
      <MovieList category="upcoming" title="개봉 예정 영화" />
    </div>
  );
};

export default Main;
