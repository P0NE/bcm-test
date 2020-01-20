import { Injectable, HttpService } from "@nestjs/common";
import { CreateFlightsDto } from "./flights.dto";

@Injectable()
export class FlightsService {
  constructor(private readonly http: HttpService) {}

  /**
   * find and aggregate possible flight with return
   * @param {CreateFlightsDto} flightsParam
   */
  public async findRFlightsAvailable(flightsParam: CreateFlightsDto) {
    //call apis for all the ongoing flight
    const flightsOngoingParam = {
      ...flightsParam,
      return_date: undefined
    };

    const [jazzOngoingResponse, moonOngoingResponse] = await Promise.all([
      this.jazz(flightsOngoingParam),
      this.moon(flightsOngoingParam)
    ]);
    const ongoingResponse = this.formatApiResponseSortByDate(
      jazzOngoingResponse,
      moonOngoingResponse
    );

    //call apis for all the return flight
    const flightsReturnParam = {
      departure_airport: flightsParam.arrival_airport,
      arrival_airport: flightsParam.departure_airport,
      departure_date: flightsParam.return_date
    };

    const [jazzReturnResponse, moonReturnResponse] = await Promise.all([
      this.jazz(flightsReturnParam),
      this.moon(flightsReturnParam)
    ]);
    const returnResponse = this.formatApiResponseSortByDate(
      jazzReturnResponse,
      moonReturnResponse
    );

    //create an array with all possibilities of going and return
    let allFlightPossibility = [];
    ongoingResponse.forEach(ongoingFlight => {
      const d1: any = new Date(ongoingFlight.flight.arrival_time);
      returnResponse.forEach(returnFlight => {
        const d2: any = new Date(returnFlight.flight.departure_time);
        if (d2 > d1) {
          allFlightPossibility.push({
            price: ongoingFlight.price + returnFlight.price,
            ongoingFlight: ongoingFlight.flight,
            returnFlight: returnFlight.flight
          });
        }
      });
    });

    //reduce by price all the possibilities
    let flightData = allFlightPossibility.reduce(
      (h, { price, ongoingFlight, returnFlight }) => {
        return Object.assign(h, {
          [price]: (h[price] || []).concat({ ongoingFlight, returnFlight })
        });
      },
      {}
    );

    //reduce all return flights for each ongoing
    for (const obj in flightData) {
      if (flightData[obj] instanceof Array) {
        flightData[obj] = flightData[obj].reduce((acc, curr) => {
          const index = acc.findIndex(x => x.id === curr.ongoingFlight.id);

          if (index >= 0) {
            acc[index] = {
              ...acc[index],
              returnFlights: [...acc[index].returnFlights, curr.returnFlight]
            };
          } else {
            acc = [
              ...acc,
              {
                ...curr.ongoingFlight,
                returnFlights: [curr.returnFlight]
              }
            ];
          }
          return acc;
        }, []);
      }
    }

    return { params: flightsParam, proposals: flightData };
  }

  /**
   * find and aggregate possible flight without return
   * @param {CreateFlightsDto} flightsParam
   */
  public async findOWFlightsAvailable(flightsParam: CreateFlightsDto) {
    const [jazzResponse, moonResponse] = await Promise.all([
      this.jazz(flightsParam),
      this.moon(flightsParam)
    ]);
    let response = this.formatApiResponseSortByDate(jazzResponse, moonResponse);
    const formattedResponse = response.reduce((h, { flight, price }) => {
      return Object.assign(h, {
        [price]: (h[price] || []).concat({ ...flight })
      });
    }, {});
    return { params: flightsParam, proposals: formattedResponse };
  }

  /**
   * Jazz Api call
   * @param flightsParam
   */
  private async jazz(flightsParam) {
    const response = await this.http
      .get("http://flights.beta.bcmenergy.fr/jazz/flights", {
        params: flightsParam
      })
      .toPromise();
    return response.data;
  }

  /**
   * Moon Api call
   * @param flightsParam
   */
  private async moon(flightsParam) {
    const response = await this.http
      .get("http://flights.beta.bcmenergy.fr/moon/flights", {
        params: flightsParam
      })
      .toPromise();
    return response.data.map(data => {
      return {
        price: data.price,
        flight: data.legs[0]
      };
    });
  }

  /**
   * Sort by date Api response
   * @param jazzResponse
   * @param moonResponse
   */
  private formatApiResponseSortByDate(jazzResponse, moonResponse) {
    return jazzResponse.concat(moonResponse).sort((data, secondData) => {
      return (
        new Date(data.flight.departure_time).getTime() -
        new Date(secondData.flight.departure_time).getTime()
      );
    });
  }
}
