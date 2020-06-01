import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TodoList} from "../entity/todo-list.entity";
import {CreateToDoListDto} from "../dto/create-list.dto";
import {TodoItem} from "../entity/todo-item.entity";
import {Repository} from "typeorm";

@Injectable()
export class ListService {

    constructor(
        @InjectRepository(TodoList)
        private listRepository: Repository<TodoList>,
    ) {
    }

    find(id: string): Promise<TodoList> {
        return this.listRepository.findOne(id);
    }

    findAll(): Promise<TodoList[]> {
        return this.listRepository.find({relations: ["items"]});
    }

    create(list: CreateToDoListDto): Promise<TodoList> {
        let todoList = new TodoList(list.title);
        todoList.items = list.items.map(i => new TodoItem(i.title));
        return this.listRepository.save(todoList);
    }

    update(id, item: TodoList) {
        return this.listRepository.update(id, item);
    }

    async delete(id): Promise<void> {
        await this.listRepository.remove(id);
    }

}
