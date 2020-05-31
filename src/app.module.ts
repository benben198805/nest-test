import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {ShareModule} from './share/share.module';
import {LoggerMiddleware} from "./logger.middleware";
import {TodoController} from "./todo/todo.controller";

@Module({
    imports: [TodoModule, ShareModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware)
            .forRoutes(TodoController);
    }
}
