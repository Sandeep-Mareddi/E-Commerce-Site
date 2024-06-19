import React from "react";
import './ContactUs.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ContactUsLeft() {
  return (
    <div className='col-md-6 text-center left-portion'>
      <div className='d-flex flex-column align-items-center justify-content-center h-100'>
        <h4>Location</h4>
        <p>123, Elm Street, Meadowville, CA 98765, USA</p>
        <br />
        <h5>Follow Us</h5>
        <div className='d-flex justify-content-center mt-3'>
          <a href='https://www.facebook.com/'>
            <i className="bi bi-facebook text-white contact-icon" data-testid='bootstrap-facebook-icon'></i>
          </a>
          <a href='https://twitter.com/i/flow/login'>
            <i className="bi bi-twitter text-white contact-icon" data-testid='bootstrap-twitter-icon'></i>
          </a>
          <a href='https://www.instagram.com/'>
            <i className="bi bi-instagram text-white contact-icon" data-testid='bootstrap-instagram-icon'></i>
          </a>
        </div>
        <br />
        <h6>&copy; {new Date().getFullYear()} Privacy Policy</h6>
      </div>
    </div>
  )
}

export default ContactUsLeft;