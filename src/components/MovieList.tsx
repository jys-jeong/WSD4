// MovieList.tsx
import React from "react";
import MovieItem from "./MovieItem";
import { Movie } from "../types/Movie";
import { toggleWishlist } from "../utils/toggleWishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface MovieListProps {
  movies: Movie[];
  wishlist: Movie[];
  setWishlist: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  wishlist,
  setWishlist,
}) => {
  return (
    <div className="movie-list">
      {movies.map((movie: Movie) => (
        <div key={movie.id}>
          <MovieItem
            movie={movie}
            onToggleWishlist={(movie) =>
              toggleWishlist(movie, wishlist, setWishlist)
            }
          />
          <p className="movie-title1">{movie.title}</p>
          {/* Rating and Icon */}
          <div className="vote">
            <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
            <p className="votenum">
              {Math.round(movie.vote_average * 10) / 10}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
