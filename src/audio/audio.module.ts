import {BullModule} from '@nestjs/bull';
import {Module} from '@nestjs/common';
import {AudioProcessor} from './audio.processor';
import {AudioController} from "./audio.controller";
import configuration from "../config/configuration";
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        BullModule.registerQueueAsync({
            name: 'audio',
            imports: [ConfigModule.forRoot({
                load: [configuration]
            })],
            useFactory: (configService: ConfigService) => configService.get('bull'),
            inject: [ConfigService]
        }),
    ],
    controllers: [AudioController],
    providers: [AudioProcessor],
})
export class AudioModule {
}