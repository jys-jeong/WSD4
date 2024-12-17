import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa"; // 아이콘 임포트
import "../assets/styles/Infinite.css";

const ScrollGuide = () => {
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    // 3초 후에 showGuide를 false로 설정하여 opacity를 0으로 바꿈
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 3000); // 3000ms = 3초

    return () => clearTimeout(timer);
  }, []);

  // showGuide가 true일 때만 안내 메시지 표시
  return (
    <div className={`scroll-guide ${showGuide ? "fade-in" : "fade-out"}`}>
      <p>스크롤을 내려주세요</p>
      <FaArrowDown className="arrow" />
    </div>
  );
};

export default ScrollGuide;
