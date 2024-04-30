import {Column} from "typeorm";
import {IsEmail, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @MinLength(6, {message:'Пароль должен быть длиннее 6 символов'})
    password:string;

}
