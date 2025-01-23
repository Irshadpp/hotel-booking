import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWTUserPayload } from "../app/utils/jwt";


///// Common User Values////
export const testUser: JWTUserPayload = {
  id: "6790ce8a3727faf4c64bd109",
  email: "testuser@example.com",
};


let mongo: MongoMemoryServer;
let mongoUri: string;

beforeAll(async () => {
  process.env.JWT_ACCESS_SECRET = "3079fde7a73e8cdee088f32e1287cf97750a7dfc313f90c4da821390166cba59"
  process.env.JWT_REFRESH_SECRET = "d6c3c00e4710d7c3c970838e7469b671c1f7627de76fe6e926f984ec983c102f"

  mongo = await MongoMemoryServer.create();
  mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);

  if (mongoose.connection.readyState !== 1) {
    throw new Error("MongoDB connection failed!");
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

// export const login = (): string[] => {

//   const accessToken = jwt.sign(testUser, process.env.JWT_ACCESS_SECRET!, { expiresIn: "30m" });

//   // Return the tokens as cookies
//   const accessTokenCookie = `accessToken=${accessToken}; Path=/; HttpOnly`;

//   // Return both cookies in an array
//   return [accessTokenCookie, refreshTokenCookie];
// };

