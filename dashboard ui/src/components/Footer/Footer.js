import React from 'react';
import './Footer.css';

function Footer(){
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <p className='footer-para'>
            Need help?
            <a href='/contactus' className='text-decoration-none footer-link'>Contact Us</a>
          </p>
        </div>
        <div className='col-md-6'>
          <p className='footer-para1'>Copyright &copy; {new Date().getFullYear()}. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;