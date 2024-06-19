import React, { useState } from 'react';
import './Logo.css';

export default function Logo() {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }
  return (
    <div className='d-flex logo justify-content-between align-items-center' >
        <p className='h1 text-white ms-3'>LOGO</p>
      <button className="btn d-md-none hamburger-menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={handleClick}>
        <i className={show ? 'd-none' : 'bi bi-list text-white'} data-testid='bootstrap-hamburger-icon'></i>
        <i className={show ? 'bi bi-x-lg text-white' : 'd-none'} data-testid='bootstrap-x-icon'></i>
      </button>
    </div>
  )
}