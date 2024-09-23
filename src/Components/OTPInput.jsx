import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to the previous input on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < pasteData.length; i++) {
      if (i >= length) break;
      if (isNaN(pasteData[i])) continue;
      newOtp[i] = pasteData[i];
      inputRefs.current[i].value = pasteData[i];
    }

    setOtp(newOtp);
    onChange(newOtp.join(''));
    inputRefs.current[Math.min(pasteData.length, length - 1)].focus();
  };

  useEffect(() => {
    onChange(otp.join(''));
  }, [otp, onChange]);

  return (
    <div className="flex justify-center items-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          ref={(ref) => (inputRefs.current[index] = ref)}
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 border-2 rounded-lg text-center text-xl font-bold text-gray-700 focus:border-blue-500 focus:outline-none transition duration-200"
        />
      ))}
    </div>
  );
};

export default OTPInput;
