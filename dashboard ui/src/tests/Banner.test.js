import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '../components/Banner/Banner';

describe('Banner component', () => {
  test('renders with default title "Dashboard"', () => {
    render(<Banner />);
    const bannerText = screen.getByText(/dashboard/i);
    expect(bannerText).toBeInTheDocument();
  });

  test('renders with title "Dashboard" when URL is "/dashboard"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/dashboard' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/dashboard/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders with title "Services" when URL is "/services"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/services' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/services/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders with title "Products" when URL is "/products"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/products' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/products/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders with title "Newsletter" when URL is "/newsletter"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/newsletter' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/newsletter/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders with title "Offers" when URL is "/offers"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/offers' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/offers/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders with title "Contact Us" when URL is "/contactus"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/contactus' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/contact us/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders with title "Contact Us" when URL is "/thankyoupage"', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/thankyoupage' },
      writable: true,
    });
    render(<Banner />);
    const bannerText = screen.getByText(/contact us/i);
    expect(bannerText).toBeInTheDocument();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
});