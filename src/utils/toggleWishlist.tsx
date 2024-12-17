import { Movie } from "../types/Movie";
import { getFromStorage, saveToStorage } from "./localstorage";

export const getWishlist = (): Movie[] => {
  const storedWishlist = getFromStorage("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

export const toggleWishlist = (
  movie: Movie,
  wishlist: Movie[],
  setWishlist: (wishlist: Movie[]) => void
) => {
  const currentWishlist = getWishlist();
  console.log(wishlist);
  if (currentWishlist.some((item: Movie) => item.id === movie.id)) {
    // 위시리스트에서 제거
    const updatedWishlist = currentWishlist.filter(
      (item: Movie) => item.id !== movie.id
    );
    saveToStorage("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist); // 상태 갱신
  } else {
    // 위시리스트에 추가
    const updatedWishlist = [...currentWishlist, movie];
    saveToStorage("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist); // 상태 갱신
  }
};
