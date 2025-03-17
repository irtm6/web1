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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const patterns_1 = require("../patterns");
let UserService = UserService_1 = class UserService {
    constructor(userClient) {
        this.userClient = userClient;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    send(pattern, data) {
        const res$ = this.userClient.send(pattern, data).pipe((0, rxjs_1.timeout)(30000), (0, rxjs_1.catchError)((e) => {
            this.logger.error(e);
            return (0, rxjs_1.throwError)(() => e);
        }));
        return (0, rxjs_1.firstValueFrom)(res$);
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Creating user with name ${dto.name}`);
            return this.send(patterns_1.patterns.USER.CREATE, dto);
        });
    }
    loginUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Logging in user with email: ${dto.email}`);
            return this.send(patterns_1.patterns.USER.LOGIN, dto);
        });
    }
    updateUser(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Updating user by id: ${id}`);
            return this.send(patterns_1.patterns.USER.UPDATE, { id, dto });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Deleting user by id: ${id}`);
            return this.send(patterns_1.patterns.USER.DELETE, { id });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Found user by id: ${id}`);
            return this.send(patterns_1.patterns.USER.FIND_BY_ID, { id });
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Found all users by id`);
            return this.send(patterns_1.patterns.USER.FIND_ALL, {});
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Found user by email: ${email}`);
            return this.send(patterns_1.patterns.USER.FIND_BY_EMAIL, { email });
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Reseting password by users email ${email}`);
            return this.send(patterns_1.patterns.USER.RESET_PASSWORD, { email });
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UserService);
