export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
}
export interface MovieItemProps {
  movie: Movie;
  onToggleWishlist: (movie: Movie) => void; // 부모 컴포넌트에서 전달된 함수
}
