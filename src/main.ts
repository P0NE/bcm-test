import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as rateLimit from "express-rate-limit";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //rate limit every IP to 100 request per 15 minutes
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );

  const options = new DocumentBuilder()
    .setTitle("Flights API")
    .setDescription("The flights aggregator API description")
    .setVersion("1.0")
    .addTag("flight")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
