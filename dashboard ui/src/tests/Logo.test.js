import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '../components/Logo/Logo';

describe('Logo component', () => {
  test('renders logo text', () => {
    render(<Logo />);
    const logoText = screen.getByText(/LOGO/i);
    expect(logoText).toBeInTheDocument();
  });

  test('toggles hamburger menu icon on button click', () => {
    render(<Logo />);
    const hamburgerIcon = screen.getByTestId('bootstrap-hamburger-icon');
    const xIcon = screen.getByTestId('bootstrap-x-icon');
    const button = screen.getByRole('button');
    expect(hamburgerIcon).toBeInTheDocument();
    expect(xIcon).toBeInTheDocument();
    fireEvent.click(button);
  });
});