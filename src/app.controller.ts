import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { CreateUserDto } from "./users/users.dto";

@Controller()
/**
 * This controller contains only a route for login an user
 */
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Body() user: CreateUserDto) {
    return this.authService.login(user);
  }
}
