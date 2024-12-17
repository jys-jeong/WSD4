export const calculateLayout = () => {
  const isMobile = window.innerWidth <= 768;
  const containerWidth = window.innerWidth * 0.9; // 컨테이너 너비의 90%
  const containerHeight = window.innerHeight * 0.7; // 컨테이너 높이의 70%
  const movieCardWidth = isMobile ? 100 : 200;
  const movieCardHeight = isMobile ? 150 : 250;
  const horizontalGap = isMobile ? 10 : 20;
  const verticalGap = isMobile ? 15 : 20;

  const rowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
  const maxRows = Math.floor(containerHeight / (movieCardHeight + verticalGap));
  const moviesPerPage = rowSize * maxRows;

  return { rowSize, moviesPerPage };
};
