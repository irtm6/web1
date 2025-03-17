import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as process from "node:process";

const dbName = process.env.DB_NAME || 'SportsCourt';

export const typeOrmModuleOptions: PostgresConnectionOptions = {
    type:'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    cache: false,
    database: dbName,
    logging: ['warn', 'error'],
    synchronize: false,
};