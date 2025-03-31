import 'dotenv/config';

export const configService = {
    getPort: () => process.env.PORT ? process.env.PORT : '4000', // Забезпечуємо, щоб це був рядок
    getBrockerUrl: () => process.env.BROCKER_URI || 'amqp://guest:guest@127.0.0.1:5672',
    getDatabaseConfig: () => ({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10), // Використовуємо рядок за замовчуванням
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '1234',
        database: process.env.DB_NAME || 'SportsCourt',
    }),
    getJwtSecret: () => process.env.JWT_SECRET || 'acess_secret',
};
