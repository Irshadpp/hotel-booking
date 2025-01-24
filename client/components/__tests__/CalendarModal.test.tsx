import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CalendarModal from "../CalendarModal";


jest.mock("react-native-calendars", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
  
    return {
      Calendar: ({ onDayPress }: { onDayPress: (day: any) => void }) => {
        return (
          <View
            testID="calendar"
            onTouchEnd={() => onDayPress({ dateString: "2025-01-25" })}
          >
            <Text>Mock Calendar</Text>
          </View>
        );
      },
    };
  });

describe("CalendarModal Component", () => {
  const mockOnDayPress = jest.fn();
  const mockOnClose = jest.fn();

  it("renders the modal when visible is true", () => {
    const { getByText } = render(
      <CalendarModal
        visible={true}
        onDayPress={mockOnDayPress}
        onClose={mockOnClose}
      />
    );

    expect(getByText("Select Date")).toBeTruthy();
  });

  it("does not render the modal when visible is false", () => {
    const { queryByText } = render(
      <CalendarModal
        visible={false}
        onDayPress={mockOnDayPress}
        onClose={mockOnClose}
      />
    );

    expect(queryByText("Select Date")).toBeNull();
  });

  it("calls onDayPress when a date is selected", () => {
    const mockOnDayPress = jest.fn();

    const { getByTestId } = render(
      <CalendarModal visible={true} onDayPress={mockOnDayPress} onClose={() => {}} />
    );

    const calendar = getByTestId("calendar");
    fireEvent(calendar, "touchEnd"); // Trigger the mock's `onTouchEnd`

    expect(mockOnDayPress).toHaveBeenCalledWith({ dateString: "2025-01-25" });
  });
});