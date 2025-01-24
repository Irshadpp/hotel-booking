import React from 'react';
import { render } from '@testing-library/react-native';
import BookingCard from '../BookingCard';

describe('BookingCard Component', () => {
  const mockProps = {
    hotelName: 'The Grand Hotel',
    location: 'New York, USA',
    bookedDate: '2025-01-25',
    price: '$200',
  };

  it('renders the component with the correct data', () => {
    const { getByText } = render(<BookingCard {...mockProps} />);

    expect(getByText('The Grand Hotel')).toBeTruthy();
    expect(getByText('New York, USA')).toBeTruthy();
    expect(getByText('Price: $200')).toBeTruthy();
  });

  it('formats the booked date correctly', () => {
    const { getByText } = render(<BookingCard {...mockProps} />);

    const formattedDate = 'Sat, Jan 25, 2025';
    expect(getByText(`Booked on: ${formattedDate}`)).toBeTruthy();
  });

  it('renders all elements in the card', () => {
    const { getByText } = render(<BookingCard {...mockProps} />);

    expect(getByText(mockProps.hotelName)).toBeTruthy();
    expect(getByText(mockProps.location)).toBeTruthy();
    expect(getByText(`Booked on: Sat, Jan 25, 2025`)).toBeTruthy();
    expect(getByText(`Price: ${mockProps.price}`)).toBeTruthy();
  });
});
