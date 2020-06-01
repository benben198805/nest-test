import {Module} from '@nestjs/common';
import {TodoItem} from "./entity/todo-item.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoList} from "./entity/todo-list.entity";
import {ItemController} from "./controller/item.controller";
import {ItemService} from "./service/item.service";
import {ListService} from "./service/list.service";
import {ListController} from "./controller/list.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TodoList, TodoItem])],
    controllers: [ItemController, ListController],
    providers: [ItemService, ListService]
})
export class TodoModule {
}
