import React, { useState } from 'react';
import './Login.css';
import LoginLeft from './LoginLeft';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userAction';
import addingProducts from '../productservice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [responseError, setResponseError] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isValidUsername: true,
    isValidPassword: true,
    touched: {
      username: false,
      password: false,
    },
  });
 
  const handleUsernameChange = (event) => {
    const username = event.target.value;
    const isValidUsername = /^[a-zA-Z0-9]+$/.test(username);
    setFormData((prevData) => ({
      ...prevData,
      username,
      isValidUsername,
    }));
  };
 
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])?(?=.*\d).{8,}$/.test(password);
    setFormData((prevData) => ({
      ...prevData,
      password,
      isValidPassword,
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
 
  const { username, isValidUsername, password, isValidPassword, touched } = formData;
  const isButtonDisabled = !username || !password;
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };
    console.log("Login with: ", user);
    let result;
    try {
      let response = await axios.post("http://localhost:8081/auth/login", user);
      let data = response.data;
      dispatch(loginUser(data));
      addingProducts();
      setResponseError("");
      navigate("/dashboard");
      result = 'User successfully logged in!!'
    }
    catch (err) {
      setResponseError(err.response.data.message || "An error occurred");
    }
  }
 
  return (
    <div className="container mt-5 mb-5 card">
      <div className="row justify-content-center">
        <LoginLeft />
        <div className="col-md-6 right-portion">
          <h2 className="card-title text-center">Login</h2>
          <form>
            <div className="mb-3" data-testid="login-page">
              <label htmlFor="username" className="form-label">
                Username
                <span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${(!isValidUsername && touched.username) ? 'is-invalid' : ''}`}
                id="username"
                name="username"
                autoComplete='off'
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => handleBlur('username')}
                required
              />
              {(!isValidUsername && touched.username) && (<div className='invalid-feedback'>Username should only contain characters.</div>)}
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
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                required
              />
              {(!isValidPassword && touched.password) && (<div className='invalid-feedback'>Password should contain atleast 8 characters, including one lowercase letter, and one digit.</div>)}
            </div>
            {responseError.length > 0 ? <div className="text-danger">{responseError}</div> : ""}
            <button type="button" className="btn btn-form rounded-pill" disabled={isButtonDisabled} onClick={handleLogin}>
              Login
            </button>
 
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default LoginPage;