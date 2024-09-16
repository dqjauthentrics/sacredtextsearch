import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
export declare class ServerConfigService {
    constructor();
    setUpDataSource(): Promise<DataSource>;
    getTypeOrmConfig(): TypeOrmModuleOptions;
    corsOptions(allowedHosts: string[]): CorsOptions;
}
