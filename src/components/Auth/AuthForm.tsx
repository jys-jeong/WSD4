// src/components/Auth/AuthForm.tsx
import React from "react";
// 스타일링 추가 가능

interface AuthFormProps {
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ children }) => {
  return <div className="auth-form-container">{children}</div>;
};

export default AuthForm;
