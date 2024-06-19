import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import {logoutUser} from '../../redux/actions/userAction';
import './NavBar.css';
import {removingProducts} from '../productservice.js';
import { useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    removingProducts();
    navigate("/");
  }
  return (
    <div className="offcanvas offcanvas-start navbar" data-bs-backdrop="false" tabIndex="-1" id="offcanvasExample">
      <div className="offcanvas-body d-flex flex-column w-100">
        <div className='container border-bottom'>
          <NavLink to='/dashboard' className='text-decoration-none nav-link' >
            DASHBOARD
          </NavLink>
        </div>
        <div className='container border-bottom'>
          <NavLink to='/services' className='text-decoration-none nav-link'>
            SERVICES
          </NavLink>
        </div>
        <div className='container border-bottom'>
          <NavLink to='/products' className='text-decoration-none nav-link'>
            PRODUCTS
          </NavLink>
        </div>
        <div className='container border-bottom'>
          <NavLink to='/newsletter' className='text-decoration-none nav-link'>
            NEWSLETTER
          </NavLink>
        </div>
        <div className='container border-bottom'>
          <NavLink to='/offers' className='text-decoration-none nav-link'>
            OFFERS
          </NavLink>
        </div>
        <div className='container border-bottom'>
          <NavLink to='/contactus' className='text-decoration-none nav-link'>
            CONTACT US
          </NavLink>
        </div>
        <div className='container'>
          <p className="text-decoration-none btn nav-link hover" onClick={handleLogout}>LOG OUT</p>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
