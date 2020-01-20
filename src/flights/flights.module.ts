import { Module, HttpModule } from "@nestjs/common";
import { FlightsService } from "./flights.service";
import { FlightsController } from "./flights.controller";

@Module({
  imports: [HttpModule],
  providers: [FlightsService],
  exports: [FlightsService],
  controllers: [FlightsController]
})
export class FlightsModule {}
