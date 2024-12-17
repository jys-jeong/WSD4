import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/Toast.css";

interface ToastProps {
  message: string | null;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false); // 3초 후에 사라지도록 설정
      }, 3000); // 3초 후에 토스트 사라짐

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible) return null;

  const icon = type === "success" ? faCircleCheck : faCircleXmark;
  const toastClass = type === "success" ? "toast success" : "toast error";

  return (
    <div className={toastClass}>
      <FontAwesomeIcon icon={icon} />
      {message}
    </div>
  );
};

export default Toast;
