import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueModule } from './modules/venue/venue.module';
import { configService } from './config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: configService.getDatabaseConfig().host,
            port: configService.getDatabaseConfig().port,
            username: configService.getDatabaseConfig().username,
            password: configService.getDatabaseConfig().password,
            database: configService.getDatabaseConfig().database,
            autoLoadEntities: true,
            synchronize: true,
        }),
        VenueModule,
    ],
})
export class AppModule {}
