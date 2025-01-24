import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Hotel } from "@/constants/interfaces";
import HotelCard from "../HotelCard";

describe("HotelCard Component", () => {
  const mockHandleBookNow = jest.fn();
  const mockHotel: Hotel = {
    id: "1",
    name: "Grand Hotel",
    location: "New York, USA",
    price: 5000,
  };

  it("renders hotel details correctly", () => {
    const { getByText } = render(
      <HotelCard hotel={mockHotel} handleBookNow={mockHandleBookNow} />
    );

    expect(getByText("Grand Hotel")).toBeTruthy();
    expect(getByText("New York, USA")).toBeTruthy();
    expect(getByText("₹5000/day")).toBeTruthy();
  });

  it('renders the "Book Now" button', () => {
    const { getByText } = render(
      <HotelCard hotel={mockHotel} handleBookNow={mockHandleBookNow} />
    );

    const button = getByText("Book Now");
    expect(button).toBeTruthy();
  });

  it("calls handleBookNow with the correct hotel ID when 'Book Now' is pressed", () => {
    const { getByText } = render(
      <HotelCard hotel={mockHotel} handleBookNow={mockHandleBookNow} />
    );

    const button = getByText("Book Now");
    fireEvent.press(button);

    expect(mockHandleBookNow).toHaveBeenCalledTimes(1);
    expect(mockHandleBookNow).toHaveBeenCalledWith("1");
  });

  it("matches the snapshot", () => {
    const tree = render(
      <HotelCard hotel={mockHotel} handleBookNow={mockHandleBookNow} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
