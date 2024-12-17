// src/components/Auth/SignUp.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validation";
import Toast from "./Toast"; // Toast 컴포넌트 임포트

interface SignUpProps {
  onToggle: () => void;
  className: string;
}

const SignUp: React.FC<SignUpProps> = ({ onToggle, className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success"); // Toast 타입 상태
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      setToastMessage("약관에 동의해주세요.");
      setToastType("error");
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage("비밀번호가 일치하지 않습니다.");
      setToastType("error");
      return;
    }

    const success = await signUp(email, password);
    const validEmail = isValidEmail(email);

    if (success && validEmail) {
      setToastMessage("회원가입 성공!");
      setToastType("success");
      onToggle(); // 로그인 화면으로 전환
    } else {
      setToastMessage("회원가입 실패!");
      setToastType("error");
    }
  };

  return (
    <>
      {/* Toast 컴포넌트 표시 */}
      {toastMessage && <Toast message={toastMessage} type={toastType} />}

      <form onSubmit={handleSubmit} className={className}>
        <h2>회원가입</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          약관에 동의합니다.{" "}
        </label>
        <button type="submit">회원가입</button>
        <button type="button" onClick={onToggle}>
          로그인하기
        </button>
      </form>
    </>
  );
};

export default SignUp;
