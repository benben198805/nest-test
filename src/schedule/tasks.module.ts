import {Module} from '@nestjs/common';
import {TasksService} from "./tasks.service";

@Module({
    providers: [],
    // providers: [TasksService],
})
export class TasksModule {
}
