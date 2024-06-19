import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from '../components/Newsletter'

test('renders newsletter component', () => {
  const { getByText } = render(<Newsletter />);
  const textElement = getByText(/Lorem ipsum dolor sit/i);
  expect(textElement).toBeInTheDocument();
});