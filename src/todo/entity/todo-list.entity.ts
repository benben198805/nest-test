import {TodoItem} from "./todo-item.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TodoList {

    constructor(title: string) {
        this.title = title;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(type => TodoItem, item => item.todoList, {cascade: ["insert", "update", "remove"]})
    items: TodoItem[];
}
