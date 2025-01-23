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
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const itemsPerPage = 3;

export default function HotelListingPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Fetch hotels from API
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/hotel`, {
        params: { page: currentPage, limit: itemsPerPage },
      });
      const data = response.data;
      if (data.success) {
        setHotels((prevHotels) => [...prevHotels, ...data.hotels]);
      } else {
        console.error("Failed to fetch hotels:", data.message);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    if (filter === "all") {
      return hotels;
    }

    return hotels.filter((hotel) => {
      if (!hotel.availableDates) return false;
      return hotel.availableDates.some(
        (date) => date >= startDate! && date <= endDate!
      );
    });
  };

  useEffect(() => {
    fetchHotels();
  }, [currentPage]);

  const handleEndReached = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const toggleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === "available") {
      setIsModalVisible(true); 
    }
  };

  const onDayPress = (day: any) => {
    if (!startDate) {
      setStartDate(day.dateString);
    } else {
      setEndDate(day.dateString);
      setIsModalVisible(false);
    }
  };

  const renderItem = ({ item }: { item: Hotel }) => (
    <View key={item.id} style={styles.hotelCard}>
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text style={styles.hotelLocation}>{item.location}</Text>
      <Text style={styles.hotelPrice}>${item.price}/night</Text>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter buttons */}
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
              filter === "available" && styles.selectedButtonAll,
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
