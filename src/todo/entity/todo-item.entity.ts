import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TodoList} from "./todo-list.entity";
import {Expose, Transform} from "class-transformer";

@Entity()
export class TodoItem {

    constructor(title: string) {
        this.title = title;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Transform(checked => checked ? 'Yes' : 'No')
    @Column({default: false})
    checked: boolean;

    @Column()
    listId: number;

    @ManyToOne(type => TodoList, list => list.items)
    @JoinColumn({name: 'listId'})
    todoList!: TodoList;

    @Expose()
    get fullName(): string {
        return `${this.title} +++++++++++++++`;
    }
}
