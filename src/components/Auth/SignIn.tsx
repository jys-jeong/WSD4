import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
} from "../../utils/localstorage";
import { isValidEmail } from "../../utils/validation";

interface SignInProps {
  onToggle: () => void;
  className: string;
  onLoginStatusChange: (status: { success: boolean; message: string }) => void; // 로그인 상태 변경 콜백
}

const SignIn: React.FC<SignInProps> = ({
  onToggle,
  className,
  onLoginStatusChange,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState(
    new URL(window.location.href).searchParams.get("code")
  );
  useEffect(() => {
    const savedEmail = getFromStorage("remembered-email");
    const rememberStatus = getFromStorage("remember-me") === "true";
    if (savedEmail && rememberStatus) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    onLoginStatusChange({ success: true, message: "카카오 로그인 접속" });
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;
  };

  useEffect(() => {
    if (code) {
      console.log(code);
      setCode(code);
      navigate("/auth");
    }
  }, [code, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(email, password);
    const validEmail = isValidEmail(email);

    if (success && validEmail) {
      saveToStorage("TMDb-Key", password);
      saveToStorage("email", email);
      if (rememberMe) {
        saveToStorage("remembered-email", email);
        saveToStorage("remember-me", "true");
      } else {
        removeFromStorage("remembered-email");
        saveToStorage("remember-me", "false");
      }
      onLoginStatusChange({ success: true, message: "로그인 성공!" }); // 로그인 성공 메시지
      navigate("/");
    } else {
      onLoginStatusChange({ success: false, message: "로그인 실패!" }); // 로그인 실패 메시지
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          아이디 저장
        </label>
        <button type="submit">로그인</button>
        <button onClick={handleLogin}>카카오로 로그인</button>
        <button type="button" onClick={onToggle}>
          회원가입하기
        </button>
      </form>
    </div>
  );
};

export default SignIn;
