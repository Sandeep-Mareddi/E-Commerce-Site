import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ContactUsPage from '../components/ContactUs/ContactUsPage';
import '@testing-library/jest-dom';

describe('ContactUsPage component', () => {
  test('renders contact us page without errors', () => {
    render(<Router><ContactUsPage /></Router>);
  });

  test('handles username input change', () => {
    render(<Router><ContactUsPage /></Router>);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });

  test('handles email input change', () => {
    render(<Router><ContactUsPage /></Router>);
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  test('handles message input change', () => {
    render(<Router><ContactUsPage /></Router>);
    fireEvent.change(screen.getByLabelText(/What can we help you with?/i), { target: { value: 'testing message box' } });
    expect(screen.getByDisplayValue('testing message box')).toBeInTheDocument();
  });

  test('handles contact us form submission', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const { getByLabelText, getByText } = render(<Router><ContactUsPage /></Router>);
    fireEvent.change(getByLabelText('Username*'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email Address*'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('What can we help you with?*'), { target: { value: 'Test message' } });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('Submit with:', 'testuser', 'test@example.com', 'Test message');
    });
    logSpy.mockRestore();
  });

  test('does not display error messages on valid input and blur', () => {
    render(<Router><ContactUsPage /></Router>);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'validUsername' } });
    fireEvent.blur(screen.getByLabelText(/Username/i));
    expect(screen.queryByText(/Username should only contain alphanumeric characters/i)).toBeNull();
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'valid@email.com' } });
    fireEvent.blur(screen.getByLabelText(/Email Address/i));
    expect(screen.queryByText(/Please enter a valid email address/i)).toBeNull();
    fireEvent.change(screen.getByLabelText(/What can we help you with?/i), { target: { value: 'Valid message' } });
    fireEvent.blur(screen.getByLabelText(/What can we help you with?/i));
    expect(screen.queryByText(/Message is required/i)).toBeNull();
  });
});
