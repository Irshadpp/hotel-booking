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
} from "react-native";
import { Calendar } from "react-native-calendars";

// Mock data for hotels (this would be fetched from an API in a real app)
const mockHotels = [
  {
    id: 1,
    name: "Hotel Alpha",
    location: "Paris",
    price: "$200/night",
    availableDates: ["2025-02-01", "2025-02-02"],
  },
  {
    id: 2,
    name: "Hotel Beta",
    location: "New York",
    price: "$120/night",
    availableDates: ["2025-02-10", "2025-02-12"],
  },
  {
    id: 3,
    name: "Hotel Gamma",
    location: "Tokyo",
    price: "$180/night",
    availableDates: ["2025-03-01", "2025-03-05"],
  },
  {
    id: 4,
    name: "Hotel Delta",
    location: "London",
    price: "$150/night",
    availableDates: ["2025-02-15", "2025-02-18"],
  },
  {
    id: 5,
    name: "Hotel Epsilon",
    location: "Sydney",
    price: "$220/night",
    availableDates: [], // No availability
  },
  {
    id: 6,
    name: "Hotel Zeta",
    location: "Dubai",
    price: "$300/night",
    availableDates: ["2025-01-30", "2025-02-02"],
  },
  {
    id: 7,
    name: "Hotel Theta",
    location: "Amsterdam",
    price: "$160/night",
    availableDates: ["2025-02-05", "2025-02-07"],
  },
];

const itemsPerPage = 3; // Number of items to load at a time

export default function HotelListingPage() {
  const [hotels, setHotels] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // 'all' or 'available'
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Function to simulate data fetching
  const fetchHotels = () => {
    setLoading(true);
    setTimeout(() => {
      const newHotels = mockHotels.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setHotels((prevHotels: any) => [...prevHotels, ...newHotels]);
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  // Filter hotels based on the selected dates and availability
  const filterHotels = () => {
    if (filter === "all") {
      return mockHotels;
    }

    // Filter based on available dates
    return mockHotels.filter((hotel) => {
      if (hotel.availableDates.length === 0) return false;
      return hotel.availableDates.some(
        (date) => date >= startDate! && date <= endDate!
      );
    });
  };

  // Fetch hotels when the component mounts or the current page changes
  useEffect(() => {
    fetchHotels();
  }, [currentPage]);

  // Handle reaching the end of the list
  const handleEndReached = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle filter change (All or Available)
  const toggleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === "available") {
      setIsModalVisible(true); // Show the calendar modal for date selection
    }
  };

  // Handle date selection in the calendar
  const onDayPress = (day: any) => {
    if (!startDate) {
      setStartDate(day.dateString);
    } else {
      setEndDate(day.dateString);
      setIsModalVisible(false); // Close the modal after selecting the end date
    }
  };

  // Render each hotel item
  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.hotelCard}>
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelLocation}>{item.location}</Text>
      <Text style={styles.hotelPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.selectedButtonAll]}
          onPress={() => toggleFilter("all")}
        >
          <Text style={[styles.filterButtonText, filter === "all" && styles.selectedText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "available" && styles.selectedButtonAvailable]}
          onPress={() => toggleFilter("available")}
        >
          <Text style={[styles.filterButtonText, filter === "available" && styles.selectedText]}>
            Available
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hotel list */}
      <FlatList
        data={filterHotels()}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1} // Trigger when 90% of the list is visible
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#5fa35f" /> : null
        }
      />

      {/* Calendar Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Dates</Text>
            <Calendar
              markedDates={{
                [startDate || ""]: { selected: true, selectedColor: "#5fa35f" },
                [endDate || ""]: { selected: true, selectedColor: "#5fa35f" },
              }}
              onDayPress={onDayPress}
              monthFormat={"yyyy MM"}
              hideExtraDays={true}
            />
            <Button title="Done" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hotelCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10, // Shadow effect for Android
  },
  hotelName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  hotelPrice: {
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
  filterContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    width: "100%",
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
