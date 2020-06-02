import {CacheModule, MiddlewareConsumer, Module, NestModule, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './todo/todo.module';
import {ShareModule} from './share/share.module';
import {LoggerMiddleware} from "./logger.middleware";
import {APP_PIPE} from "@nestjs/core";
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from "./config/configuration";
import {ScheduleModule} from '@nestjs/schedule';
import {TasksModule} from "./schedule/tasks.module";
import {AudioModule} from "./audio/audio.module";
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule.forRoot({
                load: [configuration]
            })],
            useFactory: (configService: ConfigService) => configService.get('redis'),
            inject: [ConfigService]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot({
                load: [configuration]
            })],
            useFactory: (configService: ConfigService) => configService.get('database'),
            inject: [ConfigService]
        }),
        ScheduleModule.forRoot(),
        TodoModule, ShareModule, TasksModule, AudioModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_PIPE,
        useClass: ValidationPipe
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware)
            .forRoutes(TodoModule);
    }
}
