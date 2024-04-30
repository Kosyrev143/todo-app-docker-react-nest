import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {ApiTags} from "@nestjs/swagger";
import {User} from "../user/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
@ApiTags("Login")
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly jwtService: JwtService
              ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {

    const user:User = req.user;
    const payload = {
      userId:user.id,
      email:user.email
    }
   // return this.authService.login(req.user);

    return{token: this.jwtService.sign(payload)}
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

}


