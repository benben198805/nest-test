import {CacheModule, Module} from '@nestjs/common';
import {TodoItem} from "./entity/todo-item.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {TodoList} from "./entity/todo-list.entity";
import {ItemController} from "./controller/item.controller";
import {ItemService} from "./service/item.service";
import {ListService} from "./service/list.service";
import {ListController} from "./controller/list.controller";
import {ListSubscriber} from "./subscriber/list.subscriber";

@Module({
    imports: [TypeOrmModule.forFeature([TodoList, TodoItem]), CacheModule.register()],
    controllers: [ItemController, ListController],
    providers: [ItemService, ListService, ListSubscriber]
})
export class TodoModule {
}
