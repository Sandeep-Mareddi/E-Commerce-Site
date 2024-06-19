import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Products from '../components/Products'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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

test('renders products component', () => {
  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );
  const testFamily = screen.getByTestId('subtitle');
  expect(testFamily).toBeInTheDocument();
  const testProduct = screen.getByTestId('title');
  expect(testProduct).toBeInTheDocument();
  const testDescription = screen.getByTestId('description');
  expect(testDescription).toBeInTheDocument();
});