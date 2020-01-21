import { Test } from "@nestjs/testing";
import { FlightsService } from "../flights.service";
import { FlightsController } from "../flights.controller";
import { HttpModule } from "@nestjs/common";

/**
 * Mock Response from method jazz and moon of flightService Class
 */
class ApiServiceResponse {
  moon() {
    return [
      {
        price: 80,
        flight: {
          id: "fe71592e-9451-4752-8407-76b418180fec",
          departure_airport: "CDG",
          arrival_airport: "LHR",
          departure_time: "2019-03-28T16:55",
          arrival_time: "2019-03-28T21:55"
        }
      },
      {
        price: 81,
        flight: {
          id: "2374ce16-d6a0-4359-8c85-7ac919540143",
          departure_airport: "CDG",
          arrival_airport: "LHR",
          departure_time: "2019-03-28T18:36",
          arrival_time: "2019-03-28T21:36"
        }
      },
      {
        price: 250,
        flight: {
          id: "1e5c6ece-8ae0-4ef0-8f84-b7bb5f888968",
          departure_airport: "CDG",
          arrival_airport: "LHR",
          departure_time: "2019-03-28T14:40",
          arrival_time: "2019-03-29T05:40"
        }
      }
    ];
  }

  jazz() {
    return [
      {
        price: 40,
        flight: {
          id: "fe71592e-9451-4752-8407-76b418180fec",
          departure_airport: "CDG",
          arrival_airport: "LHR",
          departure_time: "2019-03-28T19:55",
          arrival_time: "2019-03-28T21:55"
        }
      },
      {
        price: 81,
        flight: {
          id: "2374ce16-d6a0-4359-8c85-7ac919540143",
          departure_airport: "CDG",
          arrival_airport: "LHR",
          departure_time: "2019-03-28T05:36",
          arrival_time: "2019-03-28T08:36"
        }
      },
      {
        price: 250,
        flight: {
          id: "1e5c6ece-8ae0-4ef0-8f84-b7bb5f888968",
          departure_airport: "CDG",
          arrival_airport: "LHR",
          departure_time: "2019-03-28T14:20",
          arrival_time: "2019-03-29T05:40"
        }
      }
    ];
  }
}

describe("FlightService", () => {
  let flightsService: FlightsService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FlightsService],
      exports: [FlightsService],
      controllers: [FlightsController]
    }).compile();

    flightsService = module.get<FlightsService>(FlightsService);
  });

  /**
   * Simple test for formatApiResponseSortByDate method
   */
  describe("formatApiResponseSortByDate", () => {
    it("have for first element", async () => {
      const firstElementExpected = "2019-03-28T05:36";
      const lastElementExpected = "2019-03-28T19:55";
      const apiServiceResponse = new ApiServiceResponse();
      const dataSort = flightsService["formatApiResponseSortByDate"](
        apiServiceResponse.moon(),
        apiServiceResponse.jazz()
      );
      expect(dataSort[0].flight.departure_time).toEqual(firstElementExpected);
      expect(dataSort[dataSort.length - 1].flight.departure_time).toEqual(
        lastElementExpected
      );
    });
  });
});
