import React from 'react';
import Footer from '../components/Footer/Footer';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Footer component', () => {
  test('renders footer without errors', () => {
    render(<Router><Footer /></Router>);
  });

  test('displays the text properly', () => {
    render(<Router><Footer /></Router>);
    const textElement1 = screen.getByText(/Need help?/i);
    expect(textElement1).toBeInTheDocument();
    const textElement2 = screen.getByText(/Copyright/i);
    expect(textElement2).toBeInTheDocument();
  });
  
  test('anchor tag works properly', () => {
    const { getByRole } = render(<Router><Footer /></Router>);
    const linkElement = getByRole('link', { name: /contact us/i });
    expect(linkElement).toHaveAttribute('href', '/contactus');
  });
});