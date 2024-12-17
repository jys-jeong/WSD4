import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/home";
import AuthPage from "./pages/signin";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import Wishlist from "./pages/wishlist";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import Toast from "./components/Auth/Toast";
import "./AppRoutes.css";

const AppRoutes: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const isAuthenticated =
    localStorage.getItem("email") !== null ||
    localStorage.getItem("isAuthenticated") !== null;
  const location = useLocation();

  // 로그인 상태 변경 콜백
  const handleLoginStatusChange = ({
    success,
    message,
  }: {
    success: boolean;
    message: string;
  }) => {
    setToastMessage(message);
    setToastType(success ? "success" : "error");
  };

  // 'signin' 경로는 TransitionGroup 밖에서 처리
  const isSigninPage = location.pathname === "/signin";

  return (
    <div>
      {/* signin 페이지는 TransitionGroup 외부에서 렌더링 */}
      {isSigninPage ? (
        <Routes location={location}>
          <Route
            path="/signin"
            element={
              <PublicRoute isAuthenticated={isAuthenticated} redirectTo="/">
                <AuthPage onLoginStatusChange={handleLoginStatusChange} />
              </PublicRoute>
            }
          />
        </Routes>
      ) : (
        <TransitionGroup className="page-transition-container">
          <CSSTransition key={location.key} timeout={300} classNames="page">
            <div>
              <Routes location={location}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/popular"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Popular />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}

      {/* Toast 표시 */}
      <Toast message={toastMessage} type={toastType} />
    </div>
  );
};

export default AppRoutes;
