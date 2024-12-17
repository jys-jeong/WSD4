import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean; // 인증 여부
  children: React.ReactNode; // 공개 경로의 자식 컴포넌트
  redirectTo: string; // 인증 상태에서 리다이렉트할 경로
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  children,
  redirectTo,
}) => {
  if (isAuthenticated) {
    // 인증된 경우, 지정된 경로로 리다이렉트
    return <Navigate to={redirectTo} replace />;
  }

  // 인증되지 않은 경우, 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default PublicRoute;
