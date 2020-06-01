import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {CreateToDoItemDto} from "../dto/create-item.dto";
import {Roles} from "../../share/decorator/roles.decorator";
import {TodoItem} from "../entity/todo-item.entity";
import {ItemService} from "../service/item.service";

@Controller('todo/item')
export class ItemController {

    constructor(private toDoService: ItemService, private shareService: ShareService) {
    }

    @Get()
    findAll(): Promise<TodoItem[]> {
        return this.toDoService.findAll();
    }

    @Get(':id')
    find(@Param() params): Promise<TodoItem> {
        this.shareService.log(params.id);
        return this.toDoService.find(params.id);
    }

    @Post()
    @HttpCode(201)
    @Roles('admin')
    create(@Body() createToDoItem: CreateToDoItemDto) {
        console.log(createToDoItem);
        return this.toDoService.create(createToDoItem);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateToDoItem: TodoItem) {
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
