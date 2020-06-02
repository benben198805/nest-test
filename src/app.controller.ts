import {Controller, Get, Post, Render, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";

@Controller()
export class AppController {
    @Get()
    @Render('index')
    index() {
        return {message: 'hello world', tip: 'tip'}
    }

    @UseGuards(LocalAuthGuard)
    @Post("auth/login")
    async login(@Request() req) {
        return req.user;
    }
}
