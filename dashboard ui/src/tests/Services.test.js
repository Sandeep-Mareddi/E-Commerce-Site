import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from '../components/Services'

test('renders services component', () => {
  const { getByText } = render(<Services />);
  const textElement = getByText(/Lorem ipsum dolor sit/i);
  expect(textElement).toBeInTheDocument();
});