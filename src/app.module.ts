import { Module, HttpModule } from "@nestjs/common";
import { FlightsModule } from "./flights/flights.module";
import { FlightsController } from "./flights/flights.controller";

@Module({
  imports: [FlightsModule, HttpModule],
  controllers: [FlightsController]
})
export class AppModule {}
