import React, { useState, useEffect } from "react";

interface FilterBarProps {
  onGenreChange: (genre: string | null) => void;
  onRatingChange: (rating: number | null) => void;
  onSortByChange: (sortBy: string) => void;
  onSortDirectionChange: (sortDirection: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onGenreChange,
  onRatingChange,
  onSortByChange,
  onSortDirectionChange,
}) => {
  // 각 필터 상태 관리
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("vote_average");
  const [selectedSortDirection, setSelectedSortDirection] =
    useState<string>("desc");

  // 페이지 로드시 로컬스토리지에서 필터 값 불러오기
  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      setSelectedGenre(filters.genre || null);
      setSelectedRating(filters.rating || null);
      setSelectedSortBy(filters.sortBy || "vote_average");
      setSelectedSortDirection(filters.sortDirection || "desc");

      // 부모 컴포넌트에 초기값 전달
      onGenreChange(filters.genre || null);
      onRatingChange(filters.rating || null);
      onSortByChange(filters.sortBy || "vote_average");
      onSortDirectionChange(filters.sortDirection || "desc");
    }
  }, [onGenreChange, onRatingChange, onSortByChange, onSortDirectionChange]);

  // 필터 변경 핸들러
  const handleGenreChange = (genre: string | null) => {
    setSelectedGenre(genre);
    onGenreChange(genre);
    saveFiltersToLocalStorage({ genre });
  };

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(rating);
    onRatingChange(rating);
    saveFiltersToLocalStorage({ rating });
  };

  const handleSortByChange = (sortBy: string) => {
    setSelectedSortBy(sortBy);
    onSortByChange(sortBy);
    saveFiltersToLocalStorage({ sortBy });
  };

  const handleSortDirectionChange = (sortDirection: string) => {
    setSelectedSortDirection(sortDirection);
    onSortDirectionChange(sortDirection);
    saveFiltersToLocalStorage({ sortDirection });
  };

  // 로컬스토리지에 필터 값 저장
  const saveFiltersToLocalStorage = (newFilters: any) => {
    const filters = {
      genre: selectedGenre,
      rating: selectedRating,
      sortBy: selectedSortBy,
      sortDirection: selectedSortDirection,
      ...newFilters, // 새로 변경된 값만 덮어쓰기
    };
    localStorage.setItem("recent-search", JSON.stringify(filters));
  };

  // 필터 초기화 핸들러
  const handleResetFilters = () => {
    setSelectedGenre(null);
    setSelectedRating(null);
    setSelectedSortBy("vote_average");
    setSelectedSortDirection("desc");

    // 부모 컴포넌트에 초기값 전달
    onGenreChange(null);
    onRatingChange(null);
    onSortByChange("vote_average");
    onSortDirectionChange("desc");
  };

  return (
    <div className="filter-bar">
      {/* 장르 필터 */}
      <select
        value={selectedGenre || ""}
        onChange={(e) => handleGenreChange(e.target.value || null)}
      >
        <option value="">장르별</option>
        <option value="28">액션</option>
        <option value="35">코미디</option>
        <option value="18">드라마</option>
        <option value="12">모험</option>
        <option value="16">애니메이션</option>
        <option value="80">범죄</option>
        <option value="10751">가족</option>
        <option value="14">판타지</option>
        <option value="36">역사</option>
      </select>

      {/* 평점 필터 */}
      <select
        value={selectedRating ? String(selectedRating) : ""}
        onChange={(e) => handleRatingChange(Number(e.target.value) || null)}
      >
        <option value="">평점별</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
      </select>

      {/* 정렬 기준 필터 */}
      <select
        value={selectedSortBy}
        onChange={(e) => handleSortByChange(e.target.value)}
      >
        <option value="vote_average">평점순</option>
        <option value="popularity">인기 영화</option>
        <option value="release_date">출시일</option>
      </select>

      {/* 정렬 방향 필터 */}
      <select
        value={selectedSortDirection}
        onChange={(e) => handleSortDirectionChange(e.target.value)}
      >
        <option value="desc">내림차순</option>
        <option value="asc">오름차순</option>
      </select>

      {/* 초기화 버튼 */}
      <button className="reset-button" onClick={handleResetFilters}>
        초기화
      </button>
    </div>
  );
};

export default FilterBar;
