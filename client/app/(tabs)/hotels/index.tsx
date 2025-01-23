import { Hotel } from "@/constants/interfaces";
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
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // Default filter is 'all'
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch all hotels from the API
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/hotel`);
      const data = response.data;
      if (data.success) {
        setHotels(data.hotels);
      } else {
        console.error("Failed to fetch hotels:", data.message);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available hotels for a specific date
  const fetchAvailableHotels = async (date: string) => {
    if (!date) return; // Ensure a date is selected before fetching
    console.log(date, "---------date")
    setLoading(true);
    try {
      const response = await apiClient.get(`/hotel/available`, {
        params: { date },
      });
      const data = response.data;
      if (data.success) {
        setHotels(data.hotels);
      } else {
        console.error("Failed to fetch available hotels:", data.message);
      }
    } catch (error) {
      console.error("Error fetching available hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const toggleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === "available") {
      setIsModalVisible(true); // Show the calendar modal
    } else {
      fetchHotels(); // Fetch all hotels
    }
  };

  // Handle date selection in the calendar
  const onDayPress = (day: any) => {
    if(!day)
    console.log(day, "================")
    setIsModalVisible(false); // Close modal
    fetchAvailableHotels(day.dateString); // Fetch hotels based on selected date
  };

  // Handle closing the modal without selecting a date
  // const handleCloseModal = () => {
  //   if (!date) {
  //     Alert.alert(
  //       "No Date Selected",
  //       "Please select a date to view available hotels.",
  //       [{ text: "OK" }]
  //     );
  //   }
  //   setIsModalVisible(false);
  // };

  // Render hotel cards
  const renderItem = ({ item }: { item: Hotel }) => (
    <View key={item.id} style={styles.hotelCard}>
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelLocation}>{item.location}</Text>
      <Text style={styles.hotelPrice}>₹{item.price}/day</Text>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  // Initial fetch for all hotels
  useEffect(() => {
    if (filter === "all") {
      fetchHotels();
    }
  }, [filter]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
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
            style={[styles.filterButton, filter === "available" && styles.selectedButtonAll]}
            onPress={() => toggleFilter("available")}
          >
            <Text style={[styles.filterButtonText, filter === "available" && styles.selectedText]}>
              Available
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <FlatList
        data={hotels}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#5fa35f" /> : null}
      />

      {/* Calendar Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <Calendar
              onDayPress={onDayPress}
              monthFormat={"yyyy MM"}
              hideExtraDays={true}
            />
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
    marginHorizontal: "auto",
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
