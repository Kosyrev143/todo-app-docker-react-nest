import {Column, ManyToOne} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    title:string

}
