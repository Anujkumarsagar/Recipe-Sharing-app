import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, sendOTP, login } from '../store/authSlice';

export default function EnhancedLoginToggle({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [response, setResponse] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);

  const handleOTP = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(sendOTP(email));
      if (sendOTP.fulfilled.match(resultAction)) {
        setResponse('OTP sent successfully');
        setIsOtpSent(true);
      } else if (sendOTP.rejected.match(resultAction)) {
        setResponse(resultAction.payload?.message || 'Error sending OTP');
      }
    } catch (error) {
      setResponse('Error sending OTP');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setResponse('Passwords do not match');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userName', userName);
    formData.append('confirmPassword', confirmPassword);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('otp', otp);
    formData.append('location', location);

    try {
      const resultAction = await dispatch(signUp(formData));
      console.log("resultAction",resultAction);
        onClose();
        setResponse(signUp.fulfilled.payload?.message || 'Signup successful. Please login.'); 
        console.log("resultAction.payload",signUp.fulfilled.payload);
        
    } catch (error) {
      setResponse('An error occurred during signup.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        onClose();
        navigate('/profile/profile');
        window.location.reload();
      } else if (login.rejected.match(resultAction)) {
        setResponse(resultAction.payload?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setResponse('An error occurred during login.');
    }
  };

  return (
    <div
      className={`p-8 rounded-lg w-full h-full max-w-2xl max-h-[95vh] shadow-2xl transform transition-all duration-500 overflow-y-auto mx-auto ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white'
          : 'bg-gradient-to-r from-white via-blue-100 to-white text-gray-900'
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-3xl font-extrabold text-center animate-bounce">
        {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
      </h2>
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        {!isLogin && (
          <>
            <div className="">
              <label
                htmlFor="userName"
                className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="shadow appearance-none border border-blue-300 rounded-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 text-black font-bold"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="shadow appearance-none border border-blue-300 rounded-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 text-black font-bold"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="shadow appearance-none border border-blue-300 rounded-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 text-black font-bold"
                accept="image/*"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border border-blue-300 rounded-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 text-black font-bold"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border border-blue-300 rounded-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 text-black font-bold"
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none border border-blue-300 rounded-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 text-black font-bold"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-semibold mb-2 transition-colors hover:text-blue-600"
              >
                OTP
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="shadow appearance-none border border-blue-300 rounded-l-lg w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 text-black font-bold"
                  required
                />
                <button
                  type="button"
                  onClick={handleOTP}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                >
                  Send OTP
                </button>
              </div>
            </div>
          </>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-110 focus:outline-none focus:shadow-outline"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors hover:scale-110"
          >
            {isLogin ? 'Sign up instead' : 'Login instead'}
          </button>
        </div>
        {response && <p className="text-red-500 mt-4">{response}</p>}
      </form>
    </div>
  );
}
