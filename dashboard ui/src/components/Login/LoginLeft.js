import React from "react";
import './Login.css';

function LoginLeft() {
  return (
    <div className='col-md-6 text-center left-portion'>
      <div className='d-flex flex-column align-items-center justify-content-center h-100'>
        <h2>Come join us!</h2>
        <p>We are so excited to have you here. Login to get access to exclusive offers, rewards, and discounts.</p>
        <div className="mb-3">
          <p>
            Don't have an account?
            <a href="/register" className='text-decoration-none'>Register</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginLeft;