import BookingCard from '@/components/BookingCard';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function History() {
  const bookingData = [
    {
      hotelName: 'Sunset Resort',
      location: 'Miami Beach, FL',
      bookedDate: '2025-01-15',
      price: '$299 per night',
    },
    {
      hotelName: 'Mountain Escape',
      location: 'Aspen, CO',
      bookedDate: '2025-01-18',
      price: '$450 per night',
    },
  ];

  return (
    <ScrollView style={{ padding: 16 }}>
      {bookingData.map((booking, index) => (
        <BookingCard
          key={index}
          hotelName={booking.hotelName}
          location={booking.location}
          bookedDate={booking.bookedDate}
          price={booking.price}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#0a7ea4',
  },
});
