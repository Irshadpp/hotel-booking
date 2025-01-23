import request from "supertest";
import app from "../../../app";
import User from "../../models/User";
import Password from "../../utils/password";

///////////////////// create user test//////////////////////
describe("POST /api/v1/user/create", () => {
    it("should create a user and return 201 status code", async () => {
      const response = await request(app)
        .post("/api/v1/user/create")
        .send({
          email: "example@example.com",
          password: "User@123",
          confirmPassword: "User@123",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("success", true);
    });
  
    it("should return 400 if email already exists and is verified", async () => {
      await User.create({
        email: "example@gmail.com",
        password: "User@123",
      });
  
      const response = await request(app)
        .post("/api/v1/user/create")
        .send({
          email: "example@gmail.com", 
          password: "User@123",
          confirmPassword: "User@123",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  
    it("should handle errors gracefully", async () => {
      const response = await request(app)
        .post("/api/v1/user/create")
        .send({}); 
  
      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty("errors");
    });
  });


  ////////////////////// login testing ///////////////////////
  describe("POST /api/v1/user/login", () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    it("should log in a user and return 200 status code with tokens", async () => {
      const user = await User.create({
        email: "example@gmail.com",
        password: await Password.toHash("User@123"),
      });
  
      const response = await request(app)
        .post("/api/v1/user/login")
        .send({
          email: "example@gmail.com",
          password: "User@123",
        });
  
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("email", user.email);
    });
  
    it("should return 400 if email is not found", async () => {
      const response = await request(app)
        .post("/api/v1/user/login")
        .send({
          email: "nonexistent@example.com",
          password: "User@123",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toHaveProperty("message", "Invalid email or password!"); 
    });
  
  
    it("should return 400 if the password is incorrect", async () => {
      const user = await User.create({
        email: "wrongpassword@example.com",
        password: await Password.toHash("User@123"),
      });
  
      const response = await request(app)
        .post("/api/v1/user/login")
        .send({
          email: "wrongpassword@example.com",
          password: "WrongPassword!23",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toHaveProperty("message", "Invalid email or password!"); 
    });
  });