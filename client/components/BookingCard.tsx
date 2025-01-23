import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the BookingCard props interface
interface BookingCardProps {
  hotelName: string;
  location: string;
  bookedDate: string;
  price: string; // Added price field
}

const BookingCard: React.FC<BookingCardProps> = ({ hotelName, location, bookedDate, price }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.hotelName}>{hotelName}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.bookedDate}>Booked on: {bookedDate}</Text>
        <Text style={styles.price}>Price: {price}</Text> {/* Price displayed without highlight */}
      </View>
    </View>
  );
};

// Styling with fixed size and no price highlight
const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: "auto",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10, // Shadow effect for Android
  },
  cardContent: {
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  bookedDate: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
});

export default BookingCard;
