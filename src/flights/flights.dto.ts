import { IsDate, IsString, IsIn, IsOptional } from "class-validator";

import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Representation of flight Param use for validation
 */
export class CreateFlightsDto {
  @ApiProperty()
  @IsString()
  departure_airport: string;

  @ApiProperty()
  @IsString()
  arrival_airport: string;

  @ApiProperty({ type: String })
  @IsDate()
  @Type(() => Date)
  departure_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  return_date: Date;

  @ApiProperty({ enum: ["R", "OW"] })
  @IsIn(["R", "OW"])
  tripType: String;
}
