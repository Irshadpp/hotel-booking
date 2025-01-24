import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

const MessageToast: React.FC<ToastProps> = ({ message, visible, onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide(); 
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 10, 
    left: 10,
    right: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#e6ffe6", 
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    color: "#5fa35f", 
    fontWeight: "bold",
  },
});

export default MessageToast;
