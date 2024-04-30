import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Todo} from "../entities/todo.entity";

@Injectable   ()
export class TodoRepository extends Repository<Todo >{


}
