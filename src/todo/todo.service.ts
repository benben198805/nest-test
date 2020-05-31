import {Injectable} from '@nestjs/common';
import {ToDoItem} from "./dto/doto-item.dto";
import {CreateToDoItem} from "./dto/create-item.dto";
import {ShareService} from "../share/share.service";

@Injectable()
export class TodoService {
    private todos: ToDoItem[];

    constructor(private shareService: ShareService) {
        this.todos = [];
    }

    find(id: string) {
        return this.todos.find(it => it.id === id);
    }

    findAll() {
        return this.todos;
    }

    create(item: CreateToDoItem) {
        let id = this.shareService.generateUUID();
        this.todos.push({
            ...item, id
        });
        return id;
    }

    update(id, item: ToDoItem) {
        let index = this.todos.findIndex(item => item.id === id);
        if (index > -1) {
            this.todos[index] = {
                ...item,
                id
            };
        }
    }

    delete(id) {
        this.todos.filter(item => item.id === id);
    }

}
