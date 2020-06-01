import {Injectable} from '@nestjs/common';
import {TodoItem} from "../entity/todo-item.entity";
import {CreateToDoItemDto} from "../dto/create-item.dto";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ItemService {

    constructor(
        @InjectRepository(TodoItem)
        private todoItemRepository: Repository<TodoItem>) {
    }

    find(id: string): Promise<TodoItem> {
        return this.todoItemRepository.findOne(id);
    }

    findAll(): Promise<TodoItem[]> {
        return this.todoItemRepository.find({relations: ["todoList"]});
    }

    create(item: CreateToDoItemDto): Promise<TodoItem> {
        const toDoItem = {
            ...item,
            id: null
        };
        return this.todoItemRepository.save(toDoItem);
    }

    update(id, item: TodoItem) {
        return this.todoItemRepository.update(id, item);
    }

    async delete(id): Promise<void> {
        await this.todoItemRepository.remove(id);
    }

}
