import React, { useState } from "react";
import { saveToStorage, getFromStorage } from "../../utils/localstorage";

interface RememberMeProps {
  onRememberChange: (remember: boolean) => void;
}

const RememberMe: React.FC<RememberMeProps> = ({ onRememberChange }) => {
  const [remember, setRemember] = useState(
    getFromStorage("rememberMe") === "true"
  );

  const handleChange = () => {
    const newValue = !remember;
    setRemember(newValue);
    saveToStorage("rememberMe", String(newValue));
    onRememberChange(newValue);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="rememberMe"
        checked={remember}
        onChange={handleChange}
      />
      <label htmlFor="rememberMe">Remember Me</label>
    </div>
  );
};

export default RememberMe;
