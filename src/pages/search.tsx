import React, { useState } from "react";
import FilterBar from "../components/search/Filter";
import MovieList from "../components/search/InfiniteMovieList";
import "../assets/styles/Filter.css";

import Header from "../components/Header";
const SearchPage: React.FC = () => {
  const [genre, setGenre] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [sortDirection, setSortDirection] = useState<string>("desc"); // 추가

  return (
    <div>
      <Header />

      <FilterBar
        onGenreChange={setGenre}
        onRatingChange={setRating}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection} // 추가
      />

      {/* 페이지네이션 적용된 영화 리스트 */}
      <MovieList
        genre={genre}
        rating={rating}
        sortBy={sortBy}
        sortDirection={sortDirection} // 추가
      />
    </div>
  );
};

export default SearchPage;
