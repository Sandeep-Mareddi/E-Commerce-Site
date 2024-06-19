import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUsLeft from '../components/ContactUs/ContactUsLeft';
import '@testing-library/jest-dom';

describe('Contact Us component', () => {
  test('renders ContactUsLeft without errors', () => {
    render(<ContactUsLeft />);
  });

  test('displays the text properly', () => {
    render(<ContactUsLeft />);
    const textElement1 = screen.getByText(/Location/i);
    expect(textElement1).toBeInTheDocument();
    const textElement2 = screen.getByText(/123, Elm Street, Meadowville, CA 98765, USA/i);
    expect(textElement2).toBeInTheDocument();
    const textElement3 = screen.getByText(/Follow Us/i);
    expect(textElement3).toBeInTheDocument();
    const textElement4 = screen.getByText(/2024 Privacy Policy/i);
    expect(textElement4).toBeInTheDocument();
  });
  
  test('anchor tag works properly', () => {
    render(<ContactUsLeft />);
    const facebookLink = screen.getByTestId('bootstrap-facebook-icon');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveClass('bi bi-facebook');
    const twitterLink = screen.getByTestId('bootstrap-twitter-icon');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveClass('bi bi-twitter');
    const instagramLink = screen.getByTestId('bootstrap-instagram-icon');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveClass('bi bi-instagram');
  });
});