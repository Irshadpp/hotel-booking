import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Hotel } from "@/constants/interfaces";

export default function HotelCard({
    hotel,
    handleBookNow,
  }: {
    hotel: Hotel;
    handleBookNow: (hotelId: string) => void;
  }) {
    return (
      <View key={hotel.id} style={styles.card}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <Text style={styles.price}>₹{hotel.price}/day</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => handleBookNow(hotel.id)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5fa35f",
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: "#5fa35f",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
