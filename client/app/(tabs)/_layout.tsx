import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter, Slot } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Slot />
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push("/(tabs)/hotels")}
        >
          <Ionicons name="bed-outline" size={24} color="#5fa35f" />
          <Text style={styles.tabText}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push("/(tabs)/history")}
        >
          <Ionicons name="time-outline" size={24} color="#5fa35f" />
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f8f3",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Shadow for Android
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: "#4B5563",
  },
});
