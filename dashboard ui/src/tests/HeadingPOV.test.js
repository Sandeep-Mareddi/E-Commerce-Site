import React from 'react';
import HeadingPOV from '../components/HeadingPOV/HeadingPOV';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('HeadingPOV component', () => {
  test('renders HeadingPOV without errors', () => {
    render(<Router><HeadingPOV /></Router>);
  });

  test('render the heading with the correct title', () => {
    const { getByText } = render(<Router><HeadingPOV /></Router>);
    const title = getByText('Heading 1 - Point of View');
    expect(title).toBeInTheDocument();
  });

  test('render the body collapsed by default', () => {
    const { container } = render(<Router><HeadingPOV /></Router>);
    const body = container.querySelector('.headingpov-body');
    expect(body.children.length).toEqual(1);
  });

  test('should expand the body when the "Read more" button is clicked', () => {
    const { container } = render(<Router><HeadingPOV /></Router>);
    const button = container.querySelector('.hpov-link');
    button.click();
    const body = container.querySelector('.headingpov-body');
    expect(body.children.length).toBeGreaterThanOrEqual(1);
  });

  test('should collapse the body when the "Read less" button is clicked', () => {
    const { container } = render(<Router><HeadingPOV /></Router>);
    const button = container.querySelector('.hpov-link');
    button.click();
    button.click();
    const body = container.querySelector('.headingpov-body');
    expect(body.children.length).toEqual(1);
  });
});