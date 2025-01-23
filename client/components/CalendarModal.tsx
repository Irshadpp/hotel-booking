import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarModal({
  visible,
  onDayPress,
  onClose,
}: {
  visible: boolean;
  onDayPress: (day: any) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Date</Text>
          <Calendar onDayPress={onDayPress} monthFormat={"yyyy MM"} hideExtraDays={true} />
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
