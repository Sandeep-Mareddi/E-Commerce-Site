import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginLeft from '../components/Login/LoginLeft';
import '@testing-library/jest-dom';

describe('Login component', () => {
  test('renders LoginLeft without errors', () => {
    render(<LoginLeft />);
  });

  test('displays the text properly', () => {
    render(<LoginLeft />);
    const textElement1 = screen.getByText(/Come join us/i);
    expect(textElement1).toBeInTheDocument();
    const textElement2 = screen.getByText(/We are so excited to have you here/i);
    expect(textElement2).toBeInTheDocument();
    const textElement3 = screen.getByText(/Don't have an account?/i);
    expect(textElement3).toBeInTheDocument();
  });

  test('anchor tag works properly', () => {
    const { getByRole } = render(<LoginLeft />);
    const linkElement = getByRole('link', { name: /register/i });
    expect(linkElement).toHaveAttribute('href', '/register');
  });
});