import {Injectable} from '@nestjs/common';
import {ToDoItem} from "./dto/doto-item.dto";

@Injectable()
export class TodoService {
    private todos: ToDoItem[] = [];

    find(id: string) {
        return this.todos.find(it => it.id === id);
    }

    findAll() {
        return this.todos;
    }

    create(item: ToDoItem) {
        this.todos.push(item);
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
