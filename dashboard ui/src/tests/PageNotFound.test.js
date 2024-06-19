import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PageNotFound from '../components/PageNotFound';

const mockStore = configureStore([]);

describe('PageNotFound component', () => {
  test('renders the component correctly', () => {
    const store = mockStore({ UserReducer: { isValid: true } });
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    );
    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/GO TO HOME/i)).toBeInTheDocument();
  });

  test('redirects to home when the user is not valid', async () => {
    const store = mockStore({ UserReducer: { isValid: false } });
    render(
      <Provider store={store}>
        <Router initialEntries={['/404']}>
          <Routes>
            <Route path="/404" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    );
    await waitFor(() => { });
    expect(window.location.pathname).toBe('/');
  });
});