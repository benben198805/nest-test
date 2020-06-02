import {Injectable} from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [{
            userId: 1,
            username: "John",
            password: "123456",
        }, {
            userId: 2,
            username: "Chris",
            password: "123456",
        }, {
            userId: 3,
            username: "Maria",
            password: "123456",
        }, {
            userId: 4,
            username: "Ben",
            password: "123456",
        }];
    }

    async findOne(username: string) {
        return this.users.find(user => user.username === username);
    }
}
