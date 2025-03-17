import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";
import {RpcException} from "@nestjs/microservices";
import{Tokens, TokenPayload} from "./dto";

@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService)
    {}
    async generateToken(payload: TokenPayload): Promise<Tokens> {
        const[accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(payload,{
                secret: this.configService.get('JWT_SECRET') || 'secret',
                expiresIn:
                this.configService.get('JWT_EXPIRATION_TIME') || '1d',
            }),
            this.jwtService.sign(payload,{
                secret: this.configService.get('JWT_SECRET') || 'secret',
                expiresIn:
                this.configService.get('JWT_REFRESH_EXPIRATION_TIME') || '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken
        };
    }
    async verifyAccessToken(token: string): Promise<TokenPayload> {
        try{
            return this.jwtService.verify(token,{
                secret: this.configService.get<string>('JWT_SECRET') || 'secret',
            });
        } catch (error){
            throw new RpcException(error as string);
        }
    }
    async verifyRefreshToken(token: string): Promise<TokenPayload> {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_SECRET') || 'secret',
            });
        } catch (error) {
            throw new RpcException(error as string);
        }
    }

    async refreshTokens(refreshToken: string): Promise<Tokens> {
        const decoded = await this.verifyRefreshToken(refreshToken);
        const tokens = await this.generateToken({
            member_id: decoded.member_id,
            role_id: decoded.role_id,
        });
        return tokens;
    }


}