import {Tokens, TokenPayload} from './dto';
import {Controller, Logger} from "@nestjs/common";
import {MessagePattern} from "@nestjs/microservices";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly authService: AuthService) {}

    @MessagePattern('auth.tokens')
    async generateTokens(dto):Promise<Tokens> {
        this.logger.log('Generating tokens');
        return this.authService.generateToken(dto);
    }
    @MessagePattern('auth.verify')
    async verifyToken(dto): Promise<TokenPayload> {
        this.logger.log('Veryfing token');
        return this.authService.verifyAccessToken(dto);
    }

    @MessagePattern('auth.refresh')
    async refreshTokens(dto): Promise<Tokens> {
        this.logger.log('Refreshing tokens');
        return this.authService.refreshTokens(dto);
    }

}