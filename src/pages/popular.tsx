import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCellsLarge, faBars } from "@fortawesome/free-solid-svg-icons";
import PageMovieList from "../components/popular/PageMovieList";
import InfiniteMovie from "../components/popular/InfiniteMovieList";

import Header from "../components/Header";
import "../assets/styles/Popular.css";
export const Popular: React.FC = () => {
  const [viewMode, setViewMode] = useState<"page" | "infinite">("page"); // 현재 뷰 모드

  return (
    <div>
      <Header />
      <div className="view-toggle">
        {/* 버튼으로 뷰 모드 전환 */}
        <button onClick={() => setViewMode("page")} className="view-toggle-btn">
          <FontAwesomeIcon icon={faTableCellsLarge} />
        </button>
        <button
          onClick={() => setViewMode("infinite")}
          className="view-toggle-btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div className="movie-list-container">
        {/* 현재 뷰 모드에 따라 컴포넌트 렌더링 */}
        {viewMode === "page" ? <PageMovieList /> : <InfiniteMovie />}
      </div>
    </div>
  );
};

export default Popular;
