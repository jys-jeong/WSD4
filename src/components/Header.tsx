import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Header.css";
import { getFromStorage, removeFromStorage } from "../utils/localstorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faRightFromBracket,
  faHome,
  faFire,
  faSearch,
  faHeart,
} from "@fortawesome/free-solid-svg-icons"; // 추가 아이콘
import { useAuth } from "../hooks/useAuth";
import Toast from "./Auth/Toast";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const storedEmail = getFromStorage("email");
    setEmail(storedEmail);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    signOut();
    removeFromStorage("TMDb-Key");
    removeFromStorage("email");

    setToastMessage("로그아웃되었습니다.");
    setToastType("success");

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    navigate("/signin");
  };

  return (
    <>
      <header className={`header show ${isScrolled ? "scrolled" : ""}`}>
        <div className="header__logo"></div>
        <nav className="header__nav">
          <Link to="/" className="header__navItem">
            <FontAwesomeIcon
              icon={faFilm}
              size="2x"
              style={{ color: "red", display: "block" }}
            />
          </Link>
          <Link to="/" className="header__navItem">
            <FontAwesomeIcon
              icon={faHome}
              size="1x"
              style={{ marginRight: "5px" }}
            />
            홈
          </Link>
          <Link to="/popular" className="header__navItem">
            <FontAwesomeIcon
              icon={faFire}
              size="1x"
              style={{ marginRight: "5px" }}
            />
            대세 콘텐츠
          </Link>
          <Link to="/search" className="header__navItem">
            <FontAwesomeIcon
              icon={faSearch}
              size="1x"
              style={{ marginRight: "5px" }}
            />
            찾아보기
          </Link>
          <Link to="/wishlist" className="header__navItem">
            <FontAwesomeIcon
              icon={faHeart}
              size="1x"
              style={{ marginRight: "5px" }}
            />
            내게 찜한 리스트
          </Link>
        </nav>
        <div className="header__profile">
          {email && <span className="header__email">{email}님</span>}
          <button onClick={handleSignOut} className="header__profileButton">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="2x"
              style={{ color: "white" }}
            />
          </button>
        </div>
      </header>
      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </>
  );
};

export default Header;
