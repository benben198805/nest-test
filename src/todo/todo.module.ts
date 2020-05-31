import {Module} from '@nestjs/common';
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";
import {ShareModule} from "../share/share.module";

@Module({
    controllers: [TodoController],
    providers: [TodoService],
    imports: [ShareModule]
})
export class TodoModule {
}
