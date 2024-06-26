import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiProperty()
    @IsString()
    title:string
}
