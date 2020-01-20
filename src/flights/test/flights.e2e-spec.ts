import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpModule, HttpService } from "@nestjs/common";
import { FlightsService } from "../flights.service";
import { FlightsController } from "../flights.controller";

/**
 * Test end to end de l'api.
 * A ajouter avec plus de temps des tests plus précis.
 * Içi je montre juste le fonctionnement de test e2e avec nestjs pour la validation des erreurs
 */
describe("Flight", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FlightsService],
      exports: [FlightsService],
      controllers: [FlightsController]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("should return A 400 bad request if return date before departure date ", async () => {
    return await request(app.getHttpServer())
      .get(
        "/flights?departure_airport=ORL&arrival_airport=CDG&departure_date=2019-03-30&tripType=R&return_date=2019-03-29"
      )
      .expect(400);
  });

  it("should return A 400 bad request if no return date but tripType = R ", async () => {
    return await request(app.getHttpServer())
      .get(
        "/flights?departure_airport=ORL&arrival_airport=CDG&departure_date=2019-03-30&tripType=R"
      )
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
