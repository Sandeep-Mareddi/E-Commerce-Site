import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../components/Dashboard';

const mockStore = configureStore([]);
const initialState = {
  ProductReducer: {
    products: [
      {
        productId: 1,
        productFamily: 'Test Family',
        productName: 'Test Product',
        productDescription: 'This is a test product.',
      },
    ],
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

test('renders dashboard component and child component properly', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByText(/Heading 1 - Point of View/i)).toBeInTheDocument();
});

test('displays products properly', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  const testFamily = screen.getByTestId('subtitle');
  expect(testFamily).toBeInTheDocument();
  const testProduct = screen.getByTestId('title');
  expect(testProduct).toBeInTheDocument();
  const testDescription = screen.getByTestId('description');
  expect(testDescription).toBeInTheDocument();
});