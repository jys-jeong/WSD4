import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext"; // AuthProvider 임포트
import AppRoutes from "./routes"; // 라우팅 설정

const App: React.FC = () => {
  useEffect(() => {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(`${process.env.REACT_APP_KAKAO_API_KEY}`);
      console.log("Kakao SDK initialized:", kakao.isInitialized());
      console.log(process.env.REACT_APP_BASE_URL);
    }
  }, []);
  return (
    <AuthProvider>
      <Router basename="/WSD4">
        {" "}
        {/* 기본 경로를 WSD로 설정 */}
        <AppRoutes /> {/* 라우팅 설정 */}
      </Router>
    </AuthProvider>
  );
};

export default App;
