import { useState, useEffect } from "react";
import { fetchHotels, fetchAvailableHotels } from "@/services/apis";
import { Hotel } from "@/constants/interfaces";

export const useHotelListing = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadHotels = async () => {
    setLoading(true);
    try {
      const data = await fetchHotels();
      if (data.success) setHotels(data.hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableHotels = async (date: string) => {
    setLoading(true);
    try {
      const data = await fetchAvailableHotels(date);
      if (data.success) setHotels(data.hotels);
    } catch (error) {
      console.error("Error fetching available hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filter === "all") loadHotels();
  }, [filter]);

  return {
    hotels,
    loading,
    filter,
    isModalVisible,
    setFilter,
    setIsModalVisible,
    loadAvailableHotels,
  };
};
