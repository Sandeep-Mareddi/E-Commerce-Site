import React from "react";
import './Register.css';

function RegisterLeft() {
  return (
    <div className='col-md-6 text-center left-portion'>
      <div className='d-flex flex-column align-items-center justify-content-center h-100'>
        <h2>Come join us!</h2>
        <p>We are so excited to have you here. If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.</p>
        <div className="mb-3">
          <p>
            Already have an account?
            <a href="/" className='text-decoration-none'>Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterLeft;