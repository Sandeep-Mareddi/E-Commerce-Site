import React from 'react';
import { render, screen } from '@testing-library/react';
import ThankYouPage from '../components/ThankYou/ThankYouPage';
import '@testing-library/jest-dom';

describe('ThankYou component', () => {
  test('renders thank you page without errors', () => {
    render(<ThankYouPage />);
  });

  test('displays the text properly', () => {
    render(<ThankYouPage />);
    const textElement = screen.getByText(/Thank you for reaching out to us/i);
    expect(textElement).toBeInTheDocument();
  });
});