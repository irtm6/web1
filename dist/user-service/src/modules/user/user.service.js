"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const microservices_1 = require("@nestjs/microservices");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const auth_service_1 = require("../auth/auth.service");
const users_entity_1 = require("../../entities/users.entity");
const role_entity_1 = require("../../entities/role.entity");
let UserService = UserService_1 = class UserService {
    constructor(authService, userRepository, roleRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Creating user: ${JSON.stringify(dto)}`);
            const { email, username, password } = dto;
            const roleEntity = yield this.roleRepository.findOneBy({ name: 'user' });
            if (!roleEntity) {
                throw new microservices_1.RpcException(`Default role 'user' not found`);
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const userData = {
                email,
                username,
                password: hashedPassword,
            };
            const $user = this.userRepository.create(Object.assign(Object.assign({}, userData), { role_id: roleEntity.id }));
            const user = yield this.userRepository.save($user);
            return this.authService.generateToken({
                member_id: user.id,
                role_id: user.role_id,
            });
        });
    }
    loginUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Attempting login for email: ${dto.email}`);
            const { email, password } = dto;
            const user = yield this.findUserByEmail(email);
            if (!user) {
                throw new microservices_1.RpcException('user not found');
            }
            const isPasswordValid = yield bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new microservices_1.RpcException('Invalid password');
            }
            return this.authService.generateToken({
                member_id: user.id,
                role_id: user.role_id,
            });
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { id } });
        });
    }
    updateUser(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserById(id);
            if (!user) {
                throw new microservices_1.RpcException('User not found');
            }
            const roleEntity = yield this.roleRepository.findOneBy({ name: dto.role });
            if (!roleEntity) {
                throw new common_1.NotFoundException(`Role ${dto.role} not found`);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { role: _ } = dto, updateData = __rest(dto, ["role"]);
            return this.userRepository.save(Object.assign(Object.assign(Object.assign({}, user), updateData), { role_id: roleEntity.id }));
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserById(id);
            if (!user) {
                throw new microservices_1.RpcException('User not found');
            }
            return this.userRepository.delete(id);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email } });
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByEmail(email);
            if (!user) {
                throw new microservices_1.RpcException('User not found');
            }
            return this.userRepository.save(Object.assign(Object.assign({}, user), { password: '123456' }));
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
