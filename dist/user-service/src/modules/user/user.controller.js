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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const patterns_1 = require("../patterns");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(dto);
            this.logger.log('create user');
            return this.userService.createUser(dto);
        });
    }
    loginUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(dto);
            this.logger.log('login user');
            return this.userService.loginUser(dto);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findAllUsers();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findUserByEmail(email);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.findUserById(id);
        });
    }
    UpdateUser(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.updateUser(id, dto);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.deleteUser(id);
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.resetPassword(email);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.CREATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.LOGIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.FIND_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.FIND_BY_EMAIL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.FIND_BY_ID),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.UPDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.DELETE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.USER.RESET_PASSWORD),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
