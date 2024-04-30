import {Injectable} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "./entities/todo.entity";
import {UserService} from "../user/user.service";
import {Repository} from "typeorm";

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo)
                private readonly todoRepository: Repository<Todo>,
                private readonly userService: UserService
    ) {
    }

    async create(createTodoDto: CreateTodoDto, userId: number) {
        let todo: Todo = new Todo();
        todo.title = createTodoDto.title;
        todo.date = new Date().toLocaleString()
        todo.completed = false;
        todo.user = await this.userService.findUserById(userId)

        return this.todoRepository.save(todo);
    }

    findAllTodoByUserNotCompleted(userId: number) {
        return this.todoRepository.find({
            relations: ["user"],
            where: {
                user: {id: userId},
                completed: false
            }
        })
    }

  findAllTodoByUserCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ["user"],
      where: {
        user: {id: userId},
        completed: true
      }
    })
  }

    update(id: number) {
        return this.todoRepository.update(id, {completed:true});
    }

    remove(id: number) {
        return this.todoRepository.delete(id)
    }
}