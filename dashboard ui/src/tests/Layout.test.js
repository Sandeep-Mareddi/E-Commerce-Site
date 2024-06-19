import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../components/Layout';
 
test('renders layout component', () => {
  render(<Router><Layout /></Router>);
  expect(screen.getByText(/logo/i)).toBeInTheDocument();
  expect(screen.getByText(/banner/i)).toBeInTheDocument();
  expect(screen.getByText(/navbar/i)).toBeInTheDocument();
  expect(screen.getByText(/footer/i)).toBeInTheDocument();
});