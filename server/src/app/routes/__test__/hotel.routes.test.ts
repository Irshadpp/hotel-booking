import request from "supertest";
import app from "../../../app";
import Hotel from "../../models/Hotel";
import { HttpStatusCode } from "../../utils/send-response";
import { login } from "../../../test/setup";

///////////////////// Create Hotel Test /////////////////////
describe("POST /api/v1/hotel", () => {
  beforeEach(async () => {
    await Hotel.deleteMany({});
  });

  it("should create a hotel and return 201 status code", async () => {
    const response = await request(app)
      .post("/api/v1/hotel")
      .send({
        name: "Sunrise Inn",
        location: "California",
        price: 200,
      });

    expect(response.status).toBe(HttpStatusCode.CREATED);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toMatchObject({
      name: "Sunrise Inn",
      location: "California",
      price: 200,
    });
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/v1/hotel")
      .send({ location: "California" }); // Missing 'name' and 'price'

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors");
    // expect(response.body.errors.details).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({ field: "name", message: "Hotel name is required" }),
    //     expect.objectContaining({ field: "price", message: "Price is required" }),
    //   ])
    // );
  });

  it("should return 400 if the price is invalid (negative or zero)", async () => {
    const response = await request(app)
      .post("/api/v1/hotel")
      .send({
        name: "Ocean View Hotel",
        location: "Florida",
        price: -50, // Invalid price
      });

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors");
  });
});


///////////////////// Ftch All Hotel Test /////////////////////
describe("GET /api/v1/hotel", () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await login();
  });

  it("should fetch all hotels successfully with valid authentication", async () => {
    await Hotel.create([
      { name: "Hotel California", location: "California", price: 200 },
      { name: "Ocean View Hotel", location: "Florida", price: 300 },
    ]);

    const response = await request(app)
      .get("/api/v1/hotel")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatusCode.OK);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body.hotels).toHaveLength(2);
    expect(response.body.hotels).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Hotel California" }),
        expect.objectContaining({ name: "Ocean View Hotel" }),
      ])
    );
  });

  it("should return 404 if no hotels are found", async () => {
    const response = await request(app)
      .get("/api/v1/hotel")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(response.body).toHaveProperty("success", false);
  });

  it("should return 401 if no authorization header is provided", async () => {
    const response = await request(app).get("/api/v1/hotel"); // Correct endpoint
  
    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty("message", "Not authorized");
    expect(response.body).toHaveProperty("success", false);
  });

  it("should return 403 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/api/v1/hotel")
      .set("Authorization", "Bearer invalid_token");

    expect(response.status).toBe(HttpStatusCode.FORBIDDEN);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty("message", "Access forbidden");
  });
});


///////////////////// Ftch Available Hotel Test /////////////////////
describe("GET /hotel/available", () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await login();
  });


  it("should return 401 if no authorization header is provided", async () => {
    const response = await request(app).get("/api/v1/hotel/available");

    expect(response.status).toBe(HttpStatusCode.UNAUTHORIZED);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty("message", "Not authorized");
    expect(response.body).toHaveProperty("success", false);
  });

  it("should return 400 if date query parameter is missing", async () => {
    const response = await request(app)
      .get("/api/v1/hotel/available")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveProperty("message", "Date is required");
    expect(response.body).toHaveProperty("success", false);
  });

  it("should return 404 if no hotels are found for the given date", async () => {
    const response = await request(app)
      .get("/api/v1/hotel/available")
      .query({ date: "2025-02-01" })
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
    expect(response.body).toHaveProperty("message", "No hotels found for the given date");
    expect(response.body).toHaveProperty("success", false);
  });
});