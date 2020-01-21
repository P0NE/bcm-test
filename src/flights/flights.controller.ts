import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { CreateFlightsDto } from "./flights.dto";
import { FlightsService } from "./flights.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("api")
export class FlightsController {
  constructor(private readonly FlightsService: FlightsService) {}

  /**
   * GET flights
   * @param {CreateFlightsDto} fligthsParams
   */
  @UseGuards(AuthGuard("jwt"))
  @Get("flights")
  async getFlights(@Query() fligthsParams: CreateFlightsDto) {
    this.validateFlight(fligthsParams);

    if (fligthsParams.tripType == "OW")
      return await this.FlightsService.findOWFlightsAvailable(fligthsParams);
    else return await this.FlightsService.findRFlightsAvailable(fligthsParams);
  }

  /**
   * Param specific validation
   * @param {CreateFlightsDto} flightsParams
   */
  private validateFlight(flightsParams: CreateFlightsDto) {
    if (flightsParams.tripType == "R" && !flightsParams.return_date) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "You have to send a return date if tripType param is set to R"
        },
        400
      );
    }
    if (flightsParams?.return_date < flightsParams.departure_date) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "The return date is before the departure date"
        },
        400
      );
    }
  }
}
