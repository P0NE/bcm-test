import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { FlightsModule } from "../src/flights/flights.module";
import { AuthModule } from "../src/auth/auth.module";
import { AppController } from "../src/app.controller";

/**
 * Test end to end.
 * Simple test for checking specify validation of our api
 */
describe("Flight", () => {
  let app: INestApplication;
  let authToken;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FlightsModule, AuthModule],
      controllers: [AppController]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("should detect that we are not logged in", () => {
    return request(app.getHttpServer())
      .get("/api/flights")
      .query({
        departure_airport: "ORL",
        arrival_airport: "CDG",
        departure_date: "2019-03-30",
        tripType: "R",
        return_date: "2019-03-29"
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it("should login and return a token", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "BCM", password: "bcmenergy" });
    expect(response.status).toBe(201);
    authToken = response.body.access_token;
  });

  it("should return A 400 bad request if return date before departure date ", () => {
    console.log(authToken);
    return request(app.getHttpServer())
      .get("/api/flights")
      .set("Authorization", `Bearer ${authToken}`)
      .query({
        departure_airport: "ORL",
        arrival_airport: "CDG",
        departure_date: "2019-03-30",
        tripType: "R",
        return_date: "2019-03-29"
      })
      .expect(400);
  });

  it("should return A 400 bad request if no return date but tripType = R ", () => {
    return request(app.getHttpServer())
      .get("/api/flights")
      .set("Authorization", `Bearer ${authToken}`)
      .query({
        departure_airport: "ORL",
        arrival_airport: "CDG",
        departure_date: "2019-03-20",
        tripType: "R",
        return_date: "2019-03-29"
      })
      .expect(200);
  });

  it("should return A 200 if request is good ", () => {
    return request(app.getHttpServer())
      .get("/api/flights")
      .set("Authorization", `Bearer ${authToken}`)
      .query({
        departure_airport: "ORL",
        arrival_airport: "CDG",
        departure_date: "2019-03-30",
        tripType: "R"
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
