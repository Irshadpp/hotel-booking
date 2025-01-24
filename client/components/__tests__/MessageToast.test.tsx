import React from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import MessageToast from "../MessageToast"; 

describe("MessageToast Component", () => {
  const mockOnHide = jest.fn();

  it("renders the toast when visible is true", () => {
    const { getByText } = render(
      <MessageToast message="This is a test message" visible={true} onHide={mockOnHide} />
    );

    expect(getByText("This is a test message")).toBeTruthy();
  });

  it("does not render the toast when visible is false", () => {
    const { queryByText } = render(
      <MessageToast message="This message should not appear" visible={false} onHide={mockOnHide} />
    );

    expect(queryByText("This message should not appear")).toBeNull();
  });

  it("displays the correct message", () => {
    const { getByText } = render(
      <MessageToast message="Toast message content" visible={true} onHide={mockOnHide} />
    );

    expect(getByText("Toast message content")).toBeTruthy();
  });

  it("calls onHide after 2 seconds", async () => {
    jest.useFakeTimers();

    render(
      <MessageToast message="Message will disappear" visible={true} onHide={mockOnHide} />
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockOnHide).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });
});
