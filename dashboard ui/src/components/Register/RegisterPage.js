import React, { useState } from 'react';
import './Register.css';
import RegisterLeft from './RegisterLeft';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
function RegisterPage() {
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState("");
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isValidUsername: true,
    passwordsMatch: true,
    isValid: true,
    isValidPassword: true,
    touched: {
      userName: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
  });
 
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])?(?=.*\d).{8,}$/.test(password);
    setFormData({
      ...formData,
      password,
      isValidPassword,
    });
  };
 
  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setFormData({
      ...formData,
      confirmPassword,
      passwordsMatch: confirmPassword === formData.password,
    });
  };
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      isValid: name === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : prevData.isValid,
      isValidUsername: name === 'userName' ? /^[a-zA-Z0-9]+$/.test(value) : prevData.isValidUsername,
    }));
  };
 
  const handleBlur = (field) => {
    setFormData({
      ...formData,
      touched: {
        ...formData.touched,
        [field]: true,
      },
    });
  };
 
  const { userName, isValidUsername, email, isValid, password, confirmPassword, passwordsMatch, isValidPassword, touched } = formData;
  const isButtonDisabled = !userName || !email || !password || !confirmPassword;
 
  const handleRegister = async (event) => {
    event.preventDefault();
    const user = { userName, email, password };
    console.log("Register with: ", user);
    let result;
    try {
      let response = await axios.post("http://localhost:8081/auth/signup", user);
      let data = response.data;
      result = data;
    }
    catch (err) {
      result = err.response.data;
    }
   
    if (result === "User successfully Created!!") {
      alert(result);
      setResponseError("");
      navigate("/");
    } else {
      setResponseError(result);
    }
  }
 
  return (
    <div className="container mt-5 mb-5 card">
      <div className="row justify-content-center">
        <RegisterLeft />
        <div className="col-md-6 right-portion">
          <h2 className="card-title text-center">Register</h2>
          <form>
            <div className="mb-3" data-testid="register-page">
              <label htmlFor="username" className="form-label">
                Username
                <span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${(!isValidUsername && touched.userName) ? 'is-invalid' : ''}`}
                id="username"
                name="userName"
                autoComplete='off'
                value={userName}
                onChange={handleInputChange}
                onBlur={() => handleBlur('userName')}
                required
              />
              {(!isValidUsername && touched.userName) && (<div className='invalid-feedback'>Username should only contain alphanumeric characters.</div>)}
            </div>
 
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
                <span className='text-danger'>*</span>
              </label>
              <input
                type="email"
                className={`form-control ${(!isValid && touched.email) ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                autoComplete='off'
                value={email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                required
              />
              {(!isValid && touched.email) && (<div className='invalid-feedback'>Please enter a valid email address.</div>)}
            </div>
 
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
                <span className='text-danger'>*</span>
              </label>
              <input
                type="password"
                className={`form-control ${(!isValidPassword && touched.password) ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                autoComplete='off'
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                required
              />
              {(!isValidPassword && touched.password) && (<div className='invalid-feedback'>Password should contain atleast 8 characters, including one lowercase letter, and one digit.</div>)}
            </div>
 
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
                <span className='text-danger'>*</span>
              </label>
              <input
                type="password"
                className={`form-control ${(!passwordsMatch && touched.confirmPassword) ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete='off'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => handleBlur('confirmPassword')}
                required
              />
              {(!passwordsMatch && touched.confirmPassword) && (<div className='invalid-feedback'>Passwords do not match.</div>)}
            </div>
            {responseError.length > 0 ? <div className="text-danger">{responseError}</div> : ""}
            <button type="button" className="btn btn-form rounded-pill" disabled={isButtonDisabled} onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default RegisterPage;