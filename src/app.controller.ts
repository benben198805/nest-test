import {Controller, Get, Post, Render, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {

    constructor(private authService: AuthService) {
    }

    @Get()
    @Render('index')
    index() {
        return {message: 'hello world', tip: 'tip'}
    }

    @UseGuards(AuthGuard('local'))
    @Post("auth/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
