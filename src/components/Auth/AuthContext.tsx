import React, { createContext, useContext, useState } from "react";
import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
} from "../../utils/localstorage";
import { isValidEmail } from "../../utils/validation";
import Toast from "./Toast"; // Toast 컴포넌트 임포트

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  toastMessage: string | null;
  toastType: "success" | "error" | null;
  setToast: (message: string, type: "success" | "error") => void;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
  toastMessage: null,
  toastType: null,
  setToast: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getFromStorage("isAuthenticated") === "true"
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  // Toast를 관리하는 함수
  const setToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000); // 3초 후에 Toast 숨기기
  };

  // 로그인 함수
  const signIn = async (email: string, password: string) => {
    const users = JSON.parse(getFromStorage("users") || "[]");

    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      saveToStorage("isAuthenticated", "true");
      return true;
    } else {
      return false;
    }
  };

  // 회원가입 함수
  const signUp = async (email: string, password: string) => {
    const newUser = { email, password };

    // 기존 사용자 정보를 로컬스토리지에서 불러오기
    const users = JSON.parse(getFromStorage("users") || "[]");
    const user = users.find((user: { email: string }) => user.email === email);
    const isEmail = isValidEmail(email);

    if (user) {
      setToast("회원이메일이 존재합니다.", "error");
      return false;
    } else if (!isEmail) {
      setToast("이메일이 올바르지 않습니다.", "error");
      return false;
    } else {
      // 새로운 사용자 추가
      users.push(newUser);

      // 로컬스토리지에 업데이트된 사용자 정보 저장
      saveToStorage("users", JSON.stringify(users));
      saveToStorage("isAuthenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
  };

  // 로그아웃 함수
  const signOut = () => {
    setIsAuthenticated(false);
    removeFromStorage("isAuthenticated");
    localStorage.removeItem("recent-search");
    setToast("로그아웃 성공!", "success");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        toastMessage,
        toastType,
        setToast,
      }}
    >
      {children}
      {toastMessage && toastType && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
