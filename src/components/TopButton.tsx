import "../assets/styles/TopButton.css";
const TopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  return (
    <button className="top-button" onClick={scrollToTop}>
      ▲
    </button>
  );
};

export default TopButton;
