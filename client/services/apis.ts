import apiClient from "@/services/apiClient";

export const fetchHotels = async () => {
  const response = await apiClient.get(`/hotel`);
  return response.data;
};

export const fetchAvailableHotels = async (date: string) => {
  const response = await apiClient.get(`/hotel/available`, { params: { date } });
  return response.data;
};
