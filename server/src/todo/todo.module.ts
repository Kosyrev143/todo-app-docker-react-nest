import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Todo} from "./entities/todo.entity";
import {TodoRepository} from "./repo/todo.repository";
import {UserModule} from "../user/user.module";

@Module({
  imports:[TypeOrmModule.forFeature([Todo]),
      UserModule
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports:[TodoService]
})
export class TodoModule {}
