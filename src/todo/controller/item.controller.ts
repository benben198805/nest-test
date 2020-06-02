import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {CreateToDoItemDto} from "../dto/create-item.dto";
import {Roles} from "../../share/decorator/roles.decorator";
import {TodoItem} from "../entity/todo-item.entity";
import {ItemService} from "../service/item.service";
import {classToPlain, plainToClass} from "class-transformer";

@Controller('todo/item')
export class ItemController {

    constructor(private itemService: ItemService, private shareService: ShareService) {
    }

    @Get()
    findAll(): Promise<TodoItem[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    async find(@Param() params): Promise<TodoItem | any> {
        this.shareService.log(params.id);
        return await this.itemService.find(params.id).then(result => {
            return plainToClass(TodoItem, classToPlain(result));
        });
    }

    @Post()
    @HttpCode(201)
    @Roles('admin')
    create(@Body() createToDoItem: CreateToDoItemDto) {
        console.log(createToDoItem);
        return this.itemService.create(createToDoItem);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateToDoItem: TodoItem) {
        console.log(id);
        console.log(updateToDoItem);
        this.itemService.update(id, updateToDoItem);
        return "updated";
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        console.log(id);
        this.itemService.delete(id);
        return "deleted";
    }
}
