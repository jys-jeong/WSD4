import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code"); // 인증 코드 가져오기
      console.log("Code from URL:", code);
      if (code) {
        try {
          const response = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            new URLSearchParams({
              grant_type: "authorization_code",
              client_id: process.env.REACT_APP_KAKAO_API_KEY as string,
              redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI as string,
              code: code,
            }).toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const { access_token } = response.data;
          console.log(access_token);
          // 사용자 정보 가져오기
          const userInfo = await axios.get(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          console.log("사용자 정보:", userInfo.data);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("kakaoUserInfo", JSON.stringify(userInfo.data));
          setToastMessage("카카오 로그인 성공");
          navigate("/");
        } catch (error) {
          console.error("토큰 요청 실패:", error);
          setToastMessage("카카오 로그인 실패! 다시 시도해주세요.");
          alert("카카오 로그인 실패! 다시 시도해주세요");
          navigate("/signin");
        }
      }
    };

    fetchToken();
  });

  return <div>{toastMessage}</div>;
};

export default AuthCallback;
