import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean; // 인증 여부
  children: React.ReactNode; // 보호된 경로의 자식 컴포넌트
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" replace />;
  }

  // 인증된 경우, 자식 컴포넌트를 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
