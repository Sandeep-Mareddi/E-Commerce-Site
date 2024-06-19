import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import removingProducts from '../components/productservice';
import { BrowserRouter as Router } from 'react-router-dom';
 
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
 
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));
 
jest.mock('../components/productService');
 
describe('NavBar component', () => {
  let useDispatchMock;
 
  beforeEach(() => {
    useDispatchMock = jest.fn();
    useDispatch.mockReturnValue(useDispatchMock);
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders navbar without errors', () => {
    render(<Router><NavBar /></Router>);
  });
 
  test('renders all the links in the navbar', () => {
    render(<Router><NavBar /></Router>);
    const dashboardLink = screen.getByText('DASHBOARD');
    expect(dashboardLink).toBeInTheDocument();
    const servicesLink = screen.getByText('SERVICES');
    expect(servicesLink).toBeInTheDocument();
    const productsLink = screen.getByText('PRODUCTS');
    expect(productsLink).toBeInTheDocument();
    const newsletterLink = screen.getByText('NEWSLETTER');
    expect(newsletterLink).toBeInTheDocument();
    const offersLink = screen.getByText('OFFERS');
    expect(offersLink).toBeInTheDocument();
    const contactUsLink = screen.getByText('CONTACT US');
    expect(contactUsLink).toBeInTheDocument();
    const logOutLink = screen.getByText('LOG OUT');
    expect(logOutLink).toBeInTheDocument();
  });
 
  test('calls handleLogout on LOGOUT click', async () => {
    const dispatchMock = jest.fn();
    const navigateMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
    render(<Router><NavBar /></Router>);
    fireEvent.click(screen.getByText('LOG OUT'));
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({ type: "LOGOUT_USER" });
    await dispatchMock.mock.calls[0][0];
    expect(removingProducts).toHaveBeenCalledTimes(0);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});