import React, { useState } from "react";

interface TermsCheckboxProps {
  onAgreeChange: (agreed: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ onAgreeChange }) => {
  const [agreed, setAgreed] = useState(false);

  const handleChange = () => {
    const newValue = !agreed;
    setAgreed(newValue);
    onAgreeChange(newValue);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="terms"
        checked={agreed}
        onChange={handleChange}
        required
      />
      <label htmlFor="terms">약관에 동의합니다.</label>
    </div>
  );
};

export default TermsCheckbox;
