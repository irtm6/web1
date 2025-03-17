import * as process from "node:process";

class ConfigService {
    constructor(private env: string|undefined) {}

    public isProduction(): boolean {
        return this.env === 'production';
    }

    public getEnv(): string {
        return this.env || 'development';
    }
    public getBrockerUrl(): string {
        return process.env.BROCKER_URI ?? 'amqp://guest:guest@127.0.0.1:5672';
    }

    public getPort() {
        return process.env.PORT ?? 3001;
    }
}
const configService = new ConfigService(process.env.NODE_ENV);

export {configService};