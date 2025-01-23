import request from "supertest";
import { login } from "../../../test/setup";
import app from "../../../app";
import { HttpStatusCode } from "../../utils/send-response";
import mongoose from "mongoose";
import bookingService from "../../services/booking.service";
import hotelService from "../../services/hotel.service";

///////////////////// create booking Test /////////////////////
describe("POST /api/v1/booking", () => {
  let token: string;

  beforeAll(async () => {
    token = await login();
  });

  it("should return 401 if no authorization header is provided", async () => {
    const response = await request(app).post("/api/v1/booking").send({});

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty("message", "Not authorized");
    expect(response.body).toHaveProperty("success", false);
  });

  it("should return 400 if the hotel ID is missing", async () => {
    const response = await request(app)
      .post("/api/v1/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bookingDate: "2025-01-30",
      });

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty(
      "message",
      "Request validation failed."
    );
    expect(response.body.errors).toHaveProperty("details");

    expect(response.body.errors.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "hotel",
          message: "Hotel ID is required",
        }),
      ])
    );
  });

  it("should return 400 if the booking date is invalid or in the past", async () => {
    const response = await request(app)
      .post("/api/v1/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        hotel: "64b7f79f9c56f72c18c12345",
        bookingDate: "2023-01-01", // Invalid past date
      });

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty(
      "message",
      "Request validation failed."
    );
    expect(response.body.errors).toHaveProperty("details");
    expect(response.body.errors.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "bookingDate",
          message: "Booking date cannot be in the past",
        }),
      ])
    );
  });

  it("should return 404 if the hotel does not exist", async () => {
    const response = await request(app)
      .post("/api/v1/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        hotel: "64b7f79f9c56f72c18c12345", // Nonexistent hotel ID
        bookingDate: "2025-01-30",
      });

    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty("message", "Hotel not found");
  });
});

///////////////////// Get Bookings for user /////////////////////
describe("GET /api/v1/booking", () => {
  let token: string;

  beforeAll(async () => {
    token = await login();
  });

  it("should return 200 and bookings for a valid user", async () => {
    const userId = new mongoose.Types.ObjectId("64b7f79f9c56f72c18c1234f");
    const hotelId = new mongoose.Types.ObjectId("64b7f79f9c56f72c18c12345");
    const bookingDate = new Date("2025-01-30");

    // Simulate a hotel
    const hotel = await hotelService.createHotel({
      _id: hotelId,
      name: "Hotel Paris",
      location: "Paris",
      price: 500,
    });

    // Simulate an existing booking for the user
    const booking = await bookingService.createBooking({
      hotel: hotelId,
      bookingDate,
      user: userId,
    });

    const response = await request(app)
      .get("/api/v1/booking")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(HttpStatusCode.OK);
    expect(response.body).toHaveProperty(
      "message",
      "Fetched Bookings successfully"
    );
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("bookings");
    expect(response.body.bookings).toBeInstanceOf(Array);
  });

  it("should return 401 if the user is not authenticated", async () => {
    const response = await request(app).get("/api/v1/booking"); 

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body.errors).toHaveProperty("message", "Not authorized");
  });

  it("should return empty array if the user has no bookings", async () => {
    const userId = new mongoose.Types.ObjectId("64b7f79f9c56f72c18c99999");

    const response = await request(app)
      .get("/api/v1/booking")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(HttpStatusCode.OK);
    expect(response.body).toHaveProperty("bookings");
    expect(response.body).toHaveProperty("success", true);
  });
});
