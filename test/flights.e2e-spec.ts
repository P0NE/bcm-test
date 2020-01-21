import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpModule } from "@nestjs/common";
import { FlightsModule } from "../src/flights/flights.module";
import { AppModule } from "../src/app.module";
import { CreateFlightsDto } from "../src/flights/flights.dto";
import { FlightsService } from "../src/flights/flights.service";
import { FlightsController } from "../src/flights/flights.controller";

/**
 * Test end to end.
 */
describe("Flight", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, FlightsModule, HttpModule],
      providers: [FlightsService],
      exports: [FlightsService],
      controllers: [FlightsController]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("should return A 400 bad request if return date before departure date ", () => {
    return request(app.getHttpServer())
      .get(
        "/api/flights?departure_airport=ORL&arrival_airport=CDG&departure_date=2019-03-30&tripType=R&return_date=2019-03-29"
      )
      .expect(400);
  });

  it("should return A 400 bad request if no return date but tripType = R ", () => {
    return request(app.getHttpServer())
      .get("/api/flights")
      .query({
        departure_airport: "ORL",
        arrival_airport: "CDG",
        departure_date: "2019 - 03 - 30",
        tripType: "R",
        return_date: "2019 - 03 - 29"
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
