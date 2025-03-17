import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from '../auth/auth.service';

import { UserDTO } from './dto';
import { User } from '../../entities/users.entity';
import { Role } from '../../entities/role.entity';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async createUser(dto: UserDTO) {
        this.logger.log(`Creating user: ${JSON.stringify(dto)}`);
        const { email, username } = dto; // Роль убираем, т.к. будет назначена по умолчанию

        const userPassword = uuidv4().slice(0, 8); // Генерация пароля

        // Присваиваем роль по умолчанию — "user"
        const roleEntity = await this.roleRepository.findOneBy({ name: 'user' });

        // Если роль "user" не найдена, выбрасываем ошибку
        if (!roleEntity) {
            throw new RpcException(`Default role 'user' not found`);
        }

        const userData = {
            email,
            username,
            password: userPassword,
        };

        // Создаем пользователя с ролью "user"
        const $user = this.userRepository.create({
            ...userData,
            role_id: roleEntity.id,
        });

        const user = await this.userRepository.save($user);

        // Возвращаем токен авторизации
        return this.authService.generateToken({
            member_id: user.id,
            role_id: user.role_id,
        });
    }

    async loginUser(dto: { email: string; password: string }) {
        this.logger.log(`Attempting login for email: ${dto.email}`);

        const { email, password } = dto;

        // Используем `findUserByEmail` для поиска пользователя по email
        const user = await this.findUserByEmail(email);

        // Если пользователь не найден
        if (!user) {
            throw new RpcException('Invalid email or password');
        }

        // Проверяем пароль
        if (user.password !== password) {
            throw new RpcException('Invalid email or password');
        }

        // Генерируем токены и возвращаем
        return this.authService.generateToken({
            member_id: user.id,
            role_id: user.role_id,
        });
    }


    async findAllUsers() {
        return this.userRepository.find();
    }

    async findUserById(id: string) {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateUser(id: string, dto: UserDTO) {
        const user = await this.findUserById(id);
        if (!user) {
            throw new RpcException('User not found');
        }

        const roleEntity = await this.roleRepository.findOneBy({ name: dto.role });
        if (!roleEntity) {
            throw new NotFoundException(`Role ${dto.role} not found`);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { role: _, ...updateData } = dto;
        return this.userRepository.save({
            ...user,
            ...updateData,
            role_id: roleEntity.id,
        });
    }

    async deleteUser(id: string) {
        const user = await this.findUserById(id);
        if (!user) {
            throw new RpcException('User not found');
        }
        return this.userRepository.delete(id);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async resetPassword(email: string) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new RpcException('User not found');
        }
        return this.userRepository.save({ ...user, password: '123456' });
    }
}