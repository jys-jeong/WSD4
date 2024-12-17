import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getWishlist, toggleWishlist } from "../utils/toggleWishlist";
import MovieItem from "../components/MovieItem";
import { Movie } from "../types/Movie";
import InfiniteScroll from "react-infinite-scroll-component"; // Infinite Scroll 컴포넌트 임포트

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]); // 찜 리스트 데이터 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 있는지 여부

  // 로컬 스토리지에서 wishlist 데이터를 가져옵니다.
  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  // Infinite Scroll에서 더 많은 데이터를 불러올 때 호출되는 함수
  const fetchMoreData = () => {
    if (loading) return; // 로딩 중이면 더 이상 호출하지 않음
    setLoading(true);

    // 새로운 페이지에 맞는 데이터를 추가 (예시로 10개씩 추가)
    setTimeout(() => {
      const nextMovies = getWishlist().slice(page * 10, (page + 1) * 10);
      setWishlist((prevWishlist) => [...prevWishlist, ...nextMovies]);
      setPage(page + 1);
      if (nextMovies.length < 10) {
        setHasMore(false); // 데이터가 더 이상 없으면 hasMore를 false로 설정
      }
      setLoading(false);
    }, 1000); // 더미로 1초 지연
  };

  return (
    <div>
      <Header />
      <div className="wishlist" style={{ marginTop: "62px" }}>
        <h2>나의 찜 리스트</h2>

        <InfiniteScroll
          dataLength={wishlist.length} // 현재까지 불러온 데이터의 길이
          next={fetchMoreData} // 더 많은 데이터 로드 함수
          hasMore={hasMore} // 더 이상 데이터가 없는지 여부
          loader={<p>로딩 중...</p>} // 로딩 중 표시할 컴포넌트
          endMessage={<p>더 이상 찜한 영화가 없습니다.</p>} // 데이터 끝 메시지
        >
          <div className="wishlist-container">
            {wishlist.length > 0 ? (
              wishlist.map((movie) => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  onToggleWishlist={(movie) =>
                    toggleWishlist(movie, wishlist, setWishlist)
                  }
                />
              ))
            ) : (
              <p>찜한 영화가 없습니다.</p>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Wishlist;
