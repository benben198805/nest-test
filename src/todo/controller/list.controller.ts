import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {ShareService} from "../../share/share.service";
import {Roles} from "../../share/decorator/roles.decorator";
import {ListService} from "../service/list.service";
import {TodoList} from "../entity/todo-list.entity";
import {CreateToDoListDto} from "../dto/create-list.dto";

@Controller('todo')
export class ListController {

    constructor(private listService: ListService, private shareService: ShareService) {
    }

    @Get()
    findAll(): Promise<TodoList[]> {
        return this.listService.findAll();
    }

    @Get(':id')
    find(@Param() params): Promise<TodoList> {
        this.shareService.log(params.id);
        return this.listService.find(params.id);
    }

    @Post()
    @HttpCode(201)
    @Roles('admin')
    create(@Body() createToDoList: CreateToDoListDto) {
        console.log(createToDoList);
        return this.listService.create(createToDoList);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateToDoList: TodoList) {
        this.listService.update(id, updateToDoList);
        return "updated";
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        console.log(id);
        this.listService.delete(id);
        return "deleted";
    }
}
