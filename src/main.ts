import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.enableCors();

    app.use(csurf());

    app.use(compression());

    await app.listen(3000);
}

bootstrap();
