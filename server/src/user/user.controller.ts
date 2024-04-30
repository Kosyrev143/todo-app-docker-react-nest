import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {ApiSecurity, ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags("User")
@ApiSecurity("JWT-auth")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @ApiSecurity("JWT-auth")
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }



  @ApiSecurity("JWT-auth")
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
