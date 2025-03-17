import {Inject, Injectable, Logger} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {catchError, firstValueFrom, throwError, timeout} from "rxjs";

import{User} from './dto';
import {patterns} from '../patterns';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) {}

    private send(pattern:any, data:any): Promise<unknown> {
        const res$ = this.userClient.send(pattern, data).pipe(
            timeout(30000),
            catchError((e: Error) => {
                this.logger.error(e);
                return throwError(()=>e);
            }),
        );
        return firstValueFrom(res$);
    }
    async createUser(dto:User){
        this.logger.log(`Creating user with name ${dto.name}`);
        return this.send(patterns.USER.CREATE,dto);
    }

    async loginUser(dto: { email: string; password: string }) {
        this.logger.log(`Logging in user with email: ${dto.email}`);
        return this.send(patterns.USER.LOGIN, dto);
    }


    async updateUser(id: string,dto: User){
        this.logger.log(`Updating user by id: ${id}`);
        return this.send(patterns.USER.UPDATE,{id, dto});
    }
    async deleteUser(id: string){
        this.logger.log(`Deleting user by id: ${id}`);
        return this.send(patterns.USER.DELETE,{id});
    }

    async findUserById(id: string){
        this.logger.log(`Found user by id: ${id}`);
        return this.send(patterns.USER.FIND_BY_ID, {id});
    }

    async findAllUsers(){
        this.logger.log(`Found all users by id`);
        return this.send(patterns.USER.FIND_ALL,{});
    }

    async findUserByEmail(email:string){
        this.logger.log(`Found user by email: ${email}`);
        return this.send(patterns.USER.FIND_BY_EMAIL,{email});
    }

    async resetPassword(email: string){
        this.logger.log(`Reseting password by users email ${email}`);
        return this.send(patterns.USER.RESET_PASSWORD,{email});
    }
}