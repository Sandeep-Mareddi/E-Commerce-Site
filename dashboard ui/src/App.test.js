import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
 
describe('App component', () => {
  const mockStore = configureStore([]);
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
 
  test('renders app component without errors', () => {
    render(<Provider store={ store }><Router><App /></Router></Provider>);
  });
 
  test('renders app component with routes', () => {
    render(<Provider store={ store }><Router><App /></Router></Provider>);
    expect(screen.getByText(/Register/)).toBeInTheDocument();
    expect(screen.getByText(/Login/)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
    expect(screen.getByText(/Services/)).toBeInTheDocument();
    expect(screen.getByText(/Products/)).toBeInTheDocument();
    expect(screen.getByText(/Newsletter/)).toBeInTheDocument();
    expect(screen.getByText(/Offers/)).toBeInTheDocument();
    expect(screen.getByText(/ContactUsPage/)).toBeInTheDocument();
    expect(screen.getByText(/ThankYouPage/)).toBeInTheDocument();
  });
});