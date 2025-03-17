"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
let AuthService = class AuthService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const [accessToken, refreshToken] = yield Promise.all([
                this.jwtService.sign(payload, {
                    secret: this.configService.get('JWT_SECRET') || 'secret',
                    expiresIn: this.configService.get('JWT_EXPIRATION_TIME') || '1d',
                }),
                this.jwtService.sign(payload, {
                    secret: this.configService.get('JWT_SECRET') || 'secret',
                    expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME') || '7d',
                }),
            ]);
            return {
                accessToken,
                refreshToken
            };
        });
    }
    verifyAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_SECRET') || 'secret',
                });
            }
            catch (error) {
                throw new microservices_1.RpcException(error);
            }
        });
    }
    verifyRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_SECRET') || 'secret',
                });
            }
            catch (error) {
                throw new microservices_1.RpcException(error);
            }
        });
    }
    refreshTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = yield this.verifyRefreshToken(refreshToken);
            const tokens = yield this.generateToken({
                member_id: decoded.member_id,
                role_id: decoded.role_id,
            });
            return tokens;
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
