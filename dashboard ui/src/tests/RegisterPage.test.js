import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RegisterPage from '../components/Register/RegisterPage';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
 
const mockStore = configureStore([]);
 
describe('Register component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      user: null,
      isLoggedIn: false,
    });
  });
 
  test('renders register page without errors', () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
  });
 
  test('handles username input change', () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });
 
  test('handles email input change', () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });
 
  test('handles password input change', () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Password/i, { selector: '#password' }), { target: { value: 'Test1234' } });
    expect(screen.getByDisplayValue('Test1234')).toBeInTheDocument();
  });
 
  test('handles confirmPassword input change', () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Password/i, { selector: '#confirmPassword' }), { target: { value: 'Test1234' } });
    expect(screen.getByDisplayValue('Test1234')).toBeInTheDocument();
  });
 
  test('displays error message if username is invalid', () => {
    render(<Router><RegisterPage /></Router>);
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'invalid username!' } });
    fireEvent.blur(usernameInput);
    expect(screen.getByText('Username should only contain alphanumeric characters.')).toBeInTheDocument();
  });
 
  test('displays error message if email is invalid', () => {
    render(<Router><RegisterPage /></Router>);
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });
 
  test('displays error message if password is invalid', () => {
    render(<Router><RegisterPage /></Router>);
    const passwordInput = screen.getByLabelText(/password/i, { selector: '#password' });
    fireEvent.change(passwordInput, { target: { value: 'invalid-password' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText('Password should contain atleast 8 characters, including one lowercase letter, and one digit.')).toBeInTheDocument();
  });
 
  test('displays error message if passwords do not match', () => {
    render(<Router><RegisterPage /></Router>);
    const passwordInput = screen.getByLabelText(/password/i, { selector: '#password' });
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i, { selector: '#confirmPassword' });
    fireEvent.change(passwordInput, { target: { value: 'validPassword1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'passwordMismatch' } });
    fireEvent.blur(confirmPasswordInput);
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });
 
  test('updates touched state when a field is blurred', () => {
    render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i, { selector: '#password' });
    const confirmPasswordInput = screen.getByLabelText(/password/i, { selector: '#confirmPassword' });
    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.blur(usernameInput);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'validPassword1' } });
    fireEvent.blur(passwordInput);
    fireEvent.change(confirmPasswordInput, { target: { value: 'validPassword1' } });
    fireEvent.blur(confirmPasswordInput);
    // const { touched } = screen.getByTestId('register-page').getProps().formData;
    const formData = screen.getByTestId('register-page');
    const touchedField = formData.touched;
    // expect(touchedField.userName).toBe(true);
    expect(touchedField.email).toBe(true);
    expect(touchedField.password).toBe(true);
    expect(touchedField.confirmPassword).toBe(true);
  });
 
  test('Register button should call handleRegister function', async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <RegisterPage />
        </Router>
      </Provider>
    );
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i, { selector: '#password' }), { target: { value: 'TestPassword1' } });
    fireEvent.change(getByLabelText(/password/i, { selector: '#confirmPassword' }), { target: { value: 'TestPassword1' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Register with: ', { username: 'testuser', email: 'test@example.com', password: 'TestPassword1' });
    });
  });
});