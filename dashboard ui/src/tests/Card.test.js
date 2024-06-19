import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card/Card';

describe('Card Component', () => {
  const defaultProps = {
    id: 1,
    pcsubtitle: 'Subtitle',
    pctitle: 'Title',
    pcdescription: 'Description for testing purposes.',
  };

  test('renders card without errors', () => {
    render(<Card />);
  });

  test('renders card with sliced description', () => {
    render(<Card {...defaultProps} />);
    const cardSubtitle = screen.queryAllByText('Subtitle');
    const cardSubtitleWithinCard = cardSubtitle.find(element => element.closest('.card-subtitle'));
    expect(cardSubtitleWithinCard).toBeInTheDocument();
    const cardTitle = screen.queryAllByText('Title');
    const cardTitleWithinCard = cardTitle.find(element => element.closest('.card-title'));
    expect(cardTitleWithinCard).toBeInTheDocument();
    const slicedDescription = screen.queryAllByText('Description for testing purposes.'.slice(0, 100));
    expect(slicedDescription.some(element => element.textContent === 'Description for testing purposes.')).toBe(true);
  });

  test('renders "READ MORE" button and opens modal on button click', () => {
    render(<Card {...defaultProps} />);
    const readMoreButton = screen.getByText('READ MORE');
    expect(readMoreButton).toBeInTheDocument();
    fireEvent.click(readMoreButton);
    const modalSubtitle = screen.queryAllByText('Subtitle');
    const modalSubtitleWithinCard = modalSubtitle.find(element => element.closest('.modal-subtitle'));
    expect(modalSubtitleWithinCard).toBeInTheDocument();
    const modalTitle = screen.queryAllByText('Title');
    const modalTitleWithinCard = modalTitle.find(element => element.closest('.modal-title'));
    expect(modalTitleWithinCard).toBeInTheDocument();
    const modalDescription = screen.queryAllByText('Description for testing purposes.');
    const modalDescriptionWithinCard = modalDescription.find(element => element.closest('.modal-body'));
    expect(modalDescriptionWithinCard).toBeInTheDocument();
  });
});