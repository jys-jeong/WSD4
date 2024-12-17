import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext"; // AuthProvider 임포트
import AppRoutes from "./routes"; // 라우팅 설정

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/WSD">
        {" "}
        {/* 기본 경로를 WSD로 설정 */}
        <AppRoutes /> {/* 라우팅 설정 */}
      </Router>
    </AuthProvider>
  );
};

export default App;
