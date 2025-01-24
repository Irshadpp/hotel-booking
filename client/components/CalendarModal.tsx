import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarModal({
  visible,
  onDayPress,
}: {
  visible: boolean;
  onDayPress: (day: any) => void;
  onClose: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Date</Text>
          <Calendar
            testID="calendar"
            onDayPress={onDayPress}
            monthFormat={"yyyy MM"}
            hideExtraDays={true}
            minDate={today}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
