import {TodoList} from "../entity/todo-list.entity";
import {Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";

@EventSubscriber()
export class ListSubscriber implements EntitySubscriberInterface<TodoList> {

    constructor(con: Connection) {
        con.subscribers.push(this);
    }

    listenTo(): Function | string {
        return TodoList;
    }

    beforeInsert(event: InsertEvent<TodoList>): Promise<any> | void {
        console.log("before todo list inserted", event.entity)
    }
}
