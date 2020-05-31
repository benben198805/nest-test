import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {ToDoItem} from "./dto/doto-item.dto";
import {TodoService} from "./todo.service";
import {ShareService} from "../share/share.service";

@Controller('todo')
export class TodoController {

    constructor(private toDoService: TodoService, private shareService: ShareService) {
    }

    @Get()
    findAll(): ToDoItem[] {
        return this.toDoService.findAll();
    }


    @Get(':id')
    find(@Param() params): ToDoItem {
        this.shareService.log(params.id);
        return this.toDoService.find(params.id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() createToDoItem: ToDoItem) {
        console.log(createToDoItem);
        this.toDoService.create(createToDoItem);
        return "created";
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateToDoItem: ToDoItem) {
        console.log(id);
        console.log(updateToDoItem);
        this.toDoService.update(id, updateToDoItem);
        return "updated";
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        console.log(id);
        this.toDoService.delete(id);
        return "deleted";
    }
}
