import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Home: React.FC = () => {
  const { signOut } = useAuth();
  console.log(signOut);
  return (
    <div>
      <h1>메인 페이지</h1>
      <button onClick={signOut}>로그아웃</button>
    </div>
  );
};

export default Home;
