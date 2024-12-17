// AuthPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/Signup";
import "../assets/styles/AuthForm.css";

interface AuthPageProps {
  onLoginStatusChange: (status: { success: boolean; message: string }) => void; // 로그인 상태 변경 콜백
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginStatusChange }) => {
  const [isSignIn, setIsSignIn] = useState(true); // 현재 상태 (SignIn 또는 SignUp)
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsAnimating(true); // 애니메이션 시작
    setTimeout(() => {
      setIsSignIn((prev) => !prev); // 상태 전환 (SignIn -> SignUp, 또는 그 반대)
      setIsAnimating(false); // 애니메이션 종료
    }, 500); // 애니메이션 지속 시간 (0.5초)
  };

  const handleLoginStatusChange = ({
    success,
    message,
  }: {
    success: boolean;
    message: string;
  }) => {
    onLoginStatusChange({ success, message }); // 상위 컴포넌트로 로그인 상태 전달
    if (success) {
      navigate("/"); // 로그인 성공 시 홈으로 리디렉션
    }
  };

  return (
    <div className="auth-page">
      {isSignIn ? (
        <SignIn
          onToggle={handleToggle}
          className={`form-container ${
            isAnimating ? "animating-out" : "visible"
          }`}
          onLoginStatusChange={handleLoginStatusChange} // 콜백 전달
        />
      ) : (
        <SignUp
          onToggle={handleToggle}
          className={`form-container ${
            isAnimating ? "animating-out" : "visible"
          }`}
        />
      )}
    </div>
  );
};

export default AuthPage;
