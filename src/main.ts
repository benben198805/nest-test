import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as compression from 'compression';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.use(compression());

    await app.listen(3000);
}

bootstrap();
