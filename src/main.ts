import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";

var session = require('cookie-session');
var cookieParser = require('cookie-parser');

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(helmet());

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.enableCors();

    app.use(session({
        name: 'session',
        keys: ['key1', 'key2'],
        cookie: {
            secure: true,
            httpOnly: true,
            domain: '127.0.0.1',
            path: '*',
            expires: new Date(Date.now() + 60 * 60 * 1000)
        }
    }));
    app.use(cookieParser());
    // app.use(function (req, res, next) {
    //     var token = req.csrfToken();
    //     res.cookie('XSRF-TOKEN', token);
    //     res.locals.csrfToken = token;
    //     next();
    // });

    // app.use(csurf());

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    app.use(compression());

    await app.listen(3000);
}

bootstrap();
