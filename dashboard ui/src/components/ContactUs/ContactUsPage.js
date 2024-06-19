import React, { useState } from 'react';
import './ContactUs.css';
import ContactUsLeft from './ContactUsLeft';
import { Link } from 'react-router-dom';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
    isValidUsername: true,
    isValid: true,
    isValidMessage: true,
    touched: {
      username: false,
      email: false,
      message: false,
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      isValidUsername: name === 'username' ? /^[a-zA-Z0-9]+$/.test(value) : prevData.isValidUsername,
      isValid: name === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : prevData.isValid,
      isValidMessage: name === 'message' ? /.*/.test(value) : prevData.isValidMessage,
    }));
  };

  const handleBlur = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      touched: {
        ...prevData.touched,
        [field]: true,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit with:', username, email, message);
  };

  const { username, email, message, isValidUsername, isValid, isValidMessage, touched } = formData;
  const isButtonDisabled = !username || !email || !message;

  return (
    <div className="container card mt-md-5">
      <div className="row">

        <ContactUsLeft />

        <div className="col-md-6 right-portion">
          <form>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${(!isValidUsername && touched.username) ? 'is-invalid' : ''}`}
                id="username"
                name="username"
                value={username}
                autoComplete= "off"
                onChange={handleInputChange}
                onBlur={() => handleBlur('username')}
                required
              />
              {(!isValidUsername && touched.username) && (<div className='invalid-feedback'>Username should only contain alphanumeric characters.</div>)}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address<span className='text-danger'>*</span>
              </label>
              <input
                type="email"
                className={`form-control ${(!isValid && touched.email) ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={email}
                autoComplete = "off"
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                required
              />
              {(!isValid && touched.email) && (<div className='invalid-feedback'>Please enter a valid email address.</div>)}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                What can we help you with?<span className='text-danger'>*</span>
              </label>
              <textarea
                className={`form-control ${(!isValidMessage && touched.message) ? 'is-invalid' : ''}`}
                id="message"
                name="message"
                rows="3"
                value={message}
                autoComplete="off"
                onChange={handleInputChange}
                onBlur={() => handleBlur('message')}
                required
              />
              {(!isValidMessage && touched.message) && (<div className='invalid-feedback'>Message is required.</div>)}
            </div>

            <button type="button" className="btn btn-form rounded-pill" disabled={isButtonDisabled} onClick={handleSubmit}>
              <Link to='/thankyoupage' className='btn link-btn text-decoration-none'>
                Submit
              </Link>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;