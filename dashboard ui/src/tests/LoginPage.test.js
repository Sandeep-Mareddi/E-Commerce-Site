import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginPage from '../components/Login/LoginPage.js';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
// import axios from 'axios';
 
// jest.mock('axios');
 
describe('Login component', () => {
  const mockStore = configureStore([]);
  let store;
  beforeEach(() => {
    store = mockStore({
      user: null,
      isLoggedIn: false,
    });
  });
 
  test('renders login page without errors', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
  });
 
  test('handles username input change', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });
 
  test('handles password input change', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Test1234' } });
    expect(screen.getByDisplayValue('Test1234')).toBeInTheDocument();
  });
 
  test('displays error message if username is invalid', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'invalid username!' } });
    fireEvent.blur(usernameInput);
    expect(screen.getByText('Username should only contain alphanumeric characters.')).toBeInTheDocument();
  });
 
  test('displays error message if password is invalid', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'invalid-password' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText('Password should contain atleast 8 characters, including one lowercase letter, and one digit.')).toBeInTheDocument();
  });
 
  test('updates touched state when a field is blurred', () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.blur(usernameInput);
    fireEvent.change(passwordInput, { target: { value: 'validPassword1' } });
    fireEvent.blur(passwordInput);
    const formData = screen.getByTestId('login-page');
    const touchedField = formData.touched || {};
    expect(touchedField.username).toBe(true);
    expect(touchedField.password).toBe(true);
  });
 
  test('Login button should call handleLogin function', async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'TestPassword1' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Login with: ', { username: 'testuser', password: 'TestPassword1' });
    });
  });
});