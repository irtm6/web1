import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/config';
console.log(__dirname);

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...typeOrmModuleOptions,
            migrations: [__dirname + '/../../migrations/*.{js,ts}'],
            entities: [__dirname + '/../../entities/*.entity.{js,ts}'],
        }),
    ],
})
export class OrmModule {}