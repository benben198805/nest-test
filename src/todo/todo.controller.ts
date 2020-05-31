import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {ToDoItem} from "./doto-item.dto";

@Controller('todo')
export class TodoController {

    @Get()
    findAll(): ToDoItem[] {
        return [new ToDoItem()];
    }


    @Get(':id')
    find(@Param() params): ToDoItem {
        console.log(params.id);
        return new ToDoItem();
    }

    @Post()
    @HttpCode(201)
    create(@Body() createToDoItem: ToDoItem) {
        console.log(createToDoItem);
        return "created";
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateToDoItem: ToDoItem) {
        console.log(id);
        console.log(updateToDoItem);
        return "updated";
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        console.log(id);
        return "deleted";
    }
}
