import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/home/MovieList";
import Banner from "../components/home/Banner";
import Header from "../components/Header";
const Main: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(
    new URL(window.location.href).searchParams.get("code")
  );

  useEffect(() => {
    if (code) {
      console.log(code);
      setCode(code);
      navigate("/auth");
    }
  }, [code, navigate]);
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
