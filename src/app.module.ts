import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {ShareModule} from './share/share.module';
import {LoggerMiddleware} from "./logger.middleware";
import {TodoController} from "./todo/todo.controller";
import {APP_PIPE} from "@nestjs/core";
import {ValidatePipe} from "./validate.pipe";

@Module({
    imports: [TodoModule, ShareModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_PIPE,
        useClass: ValidatePipe
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware)
            .forRoutes(TodoController);
    }
}
