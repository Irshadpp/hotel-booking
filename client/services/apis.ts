import apiClient from "@/services/apiClient";

export const fetchHotels = async () => {
  const response = await apiClient.get(`/hotel`);
  return response.data;
};

export const fetchAvailableHotels = async (date: string) => {
  const response = await apiClient.get(`/hotel/available`, { params: { date } });
  return response.data;
};

 export const bookHotel = async (hotelId: string, date: string) => {
      const response = await apiClient.post("/booking", {
        hotel: hotelId,
        bookingDate: date,
      });
      return response.data
  };