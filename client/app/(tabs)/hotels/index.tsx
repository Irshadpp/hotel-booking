import CalendarModal from "@/components/CalendarModal";
import HotelCard from "@/components/HotelCard";
import { Hotel } from "@/constants/interfaces";
import { useHotelListing } from "@/hooks/useHotelListing";
import apiClient from "@/services/apiClient";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Button,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HotelListingPage() {
  const {
    hotels,
    loading,
    filter,
    isModalVisible,
    setFilter,
    setIsModalVisible,
    loadAvailableHotels,
  } = useHotelListing();

  const toggleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === "available") {
      setIsModalVisible(true); // Show the calendar modal for date selection
    } else {
      loadAvailableHotels(""); // Fetch all hotels when 'All' is selected
    }
  };

  const onDayPress = (day: any) => {
    setIsModalVisible(false);
    loadAvailableHotels(day.dateString);
  };

  return (
    <View style={styles.container}>
       <SafeAreaView>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.selectedButtonAll,
            ]}
            onPress={() => toggleFilter("all")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "all" && styles.selectedText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "available" && styles.selectedButtonAvailable,
            ]}
            onPress={() => toggleFilter("available")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "available" && styles.selectedText,
              ]}
            >
              Available
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={hotels}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#5fa35f" /> : null}
      />

      <CalendarModal
        visible={isModalVisible}
        onDayPress={onDayPress}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   filterContainer: { flexDirection: "row", justifyContent: "space-around" },
//   filterButton: { padding: 10, borderWidth: 1, borderColor: "#5fa35f" },
//   selectedButton: { backgroundColor: "#5fa35f" },
//   filterButtonText: { color: "#fff" },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around", 
    alignItems: "center", 
  },
  filterButton: {
    width: "50%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5fa35f",
    borderRadius: 10,
  },
  selectedButtonAll: {
    backgroundColor: "#5fa35f",
  },
  selectedButtonAvailable: {
    backgroundColor: "#5fa35f",
  },
  filterButtonText: {
    color: "#5fa35f",
    fontWeight: "bold",
  },
  selectedText: {
    color: "#fff",
  },
});
