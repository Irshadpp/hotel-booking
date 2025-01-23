import BookingCard from '@/components/BookingCard';
import { fetchBookings } from '@/services/apis';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function History() {
  const [bookingData, setBookingData] = useState<any[]>([])
  const [loading, setLoading] = useState(false);

   const loadBookings = async () => {
      setLoading(true);
      try {
        const data = await fetchBookings();
        if (data.success){
          const filteredData: any = data.bookings.map((item: any) => {
            return {
              hotelName: item.hotel.name,
              location: item.hotel.location,
              bookedDate: item.bookingDate,
              price: item.hotel.price,
            };
          });
          console.log(filteredData)
          setBookingData(filteredData);
        } 
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(()=>{
    loadBookings();
  }, [])


  return (
    <ScrollView style={{ padding: 16 }}>
      {bookingData && bookingData.map((booking, index) => (
        <BookingCard
          key={index}
          hotelName={booking.hotelName}
          location={booking.location}
          bookedDate={booking.bookedDate}
          price={booking.price}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#0a7ea4',
  },
});
