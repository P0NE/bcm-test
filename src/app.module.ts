import { Module, HttpModule } from "@nestjs/common";
import { FlightsModule } from "./flights/flights.module";
import { FlightsController } from "./flights/flights.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";

@Module({
  imports: [FlightsModule, HttpModule, AuthModule, UsersModule],
  controllers: [FlightsController, AppController]
})
export class AppModule {}
