import { DataSource } from 'typeorm';
export interface ServerConfigInterface {
    dbHost: string;
    dbPort: string;
    dbUser: string;
    dbPass: string;
    dbName: string;
    corsHosts: string[];
    expressionSessionSecret: string;
    serverPort: number;
    opMode: string;
    dataSource: DataSource;
}
