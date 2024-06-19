import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ContactUsPage from './components/ContactUs/ContactUsPage';
import Services from './components/Services';
import Products from './components/Products';
import Newsletter from './components/Newsletter';
import Offers from './components/Offers';
import ThankYouPage from './components/ThankYou/ThankYouPage';
import RegisterPage from './components/Register/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import PageNotFound from './components/PageNotFound';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
 
function App() {
  const validUser = useSelector(state => state.UserReducer.isValid);
  return (
    <Router>
      <Routes>
 
        <Route path='/register' Component={RegisterPage} />
        <Route path='/' Component={LoginPage} />
 
        {
          validUser &&
          <Route path='/' Component={Layout}>
            <Route path='dashboard' Component={Dashboard} />
            <Route path='services' Component={Services} />
            <Route path='products' Component={Products} />
            <Route path='newsletter' Component={Newsletter} />
            <Route path='offers' Component={Offers} />
            <Route path='contactus' Component={ContactUsPage} />
            <Route path='thankyoupage' Component={ThankYouPage} />
          </Route>
        }
 
        <Route path='*' Component={PageNotFound} />
      </Routes>
    </Router>
  );
}
 
export default App;