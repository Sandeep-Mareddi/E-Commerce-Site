import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Offers from '../components/Offers'

test('renders offers component', () => {
  const { getByText } = render(<Offers />);
  const textElement = getByText(/Lorem ipsum dolor sit/i);
  expect(textElement).toBeInTheDocument();
});