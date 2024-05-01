import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTodosByUserIdNotCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserNotCompleted(Number(userId));
  }

  @Get('/findAllCompleted/:userId')
  findAllTodosByUserIdCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserCompleted(Number(userId));
  }

  @Get('/all')
  findAllTodos() {
    return this.todoService.findAllTodos();
  }

  @Patch('/one/:id')
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(Number(id), updateTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todoService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(Number(id));
  }
}
