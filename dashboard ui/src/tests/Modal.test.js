import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../components/Modal/Modal';

describe('Modal Component', () => {
  const defaultProps = {
    pmsubtitle: 'Subtitle',
    pmtitle: 'Title',
    pmdescription: 'Description',
  };

  test('renders modal without errors', () => {
    render(<Modal />);
  });

  test('renders the modal title, subtitle, and description are rendered correctly', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.queryByText('Subtitle')).toBeInTheDocument();
    expect(screen.queryByText('Title')).toBeInTheDocument();
    expect(screen.queryByText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  test('calls onClose function when close button (X) is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Modal {...defaultProps} onClose={onCloseMock} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose function when CLOSE button (button) is clicked', () => {
    const onCloseMock = jest.fn();
    render(<Modal {...defaultProps} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText('CLOSE'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});