import {Controller, Body, Post, Logger, UseGuards, Get, Request} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./dto";
import { AuthGuard } from '../../guards/auth.guard';
@Controller('user')
//@UseGuards(AuthGuard)
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService:UserService) {}

    @Post('register')
    async registerUser(@Body() user: User) {
        this.logger.log('Registering user');
        return this.userService.createUser(user); // Если createUser действительно существует
    }

    @Post('login')
    async loginUser(@Body() dto: { email: string; password: string }) {

            this.logger.log(`Attempting to log in user with email: ${dto.email}`);
            return this.userService.loginUser(dto); // Возвращаем токены, сгенерированные User Service
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: { user: User }) {
        return req.user;
    }
}
