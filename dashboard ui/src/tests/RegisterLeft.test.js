import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterLeft from '../components/Register/RegisterLeft';
import '@testing-library/jest-dom';

describe('Register component', () => {
  test('renders RegisterLeft without errors', () => {
    render(<RegisterLeft />);
  });

  test('displays the text properly', () => {
    render(<RegisterLeft />);
    const textElement1 = screen.getByText(/Come join us/i);
    expect(textElement1).toBeInTheDocument();
    const textElement2 = screen.getByText(/We are so excited to have you here/i);
    expect(textElement2).toBeInTheDocument();
    const textElement3 = screen.getByText(/Already have an account?/i);
    expect(textElement3).toBeInTheDocument();
  });

  test('anchor tag works properly', () => {
    const { getByRole } = render(<RegisterLeft />);
    const linkElement = getByRole('link', { name: /login/i });
    expect(linkElement).toHaveAttribute('href', '/');
  });
});