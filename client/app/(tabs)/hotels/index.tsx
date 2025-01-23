import CalendarModal from "@/components/CalendarModal";
import HotelCard from "@/components/HotelCard";
import { useHotelListing } from "@/hooks/useHotelListing";
import { bookHotel } from "@/services/apis";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
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

  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null); 
  const [isBookingFlow, setIsBookingFlow] = useState<boolean>(false); 

  const toggleFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === "available") {
      setIsBookingFlow(false)
      setIsModalVisible(true); 
    } else {
      loadAvailableHotels(""); 
    }
  };

  const onDayPress = async (day: any) => {
    setIsModalVisible(false);

    if (isBookingFlow && selectedHotelId) {
      console.log("hellooooooo", selectedHotelId, day.dateString);
      await bookHotel(selectedHotelId, day.dateString);
    } else {
      await loadAvailableHotels(day.dateString);
    }
  };

  const handleBookNow = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setIsBookingFlow(true);
    setIsModalVisible(true);
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
        renderItem={({ item }) => <HotelCard hotel={item}  handleBookNow={handleBookNow} />}
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
