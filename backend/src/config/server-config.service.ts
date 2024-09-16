import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServerConfigInterface } from './server-config.interface';
import { HttpStatus, Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Religion } from '../entities/religion';
import { Verse } from '../entities/verse';
import { Tome } from '../entities/tome';
import { Book } from '../entities/book';
import { Chapter } from '../entities/chapter';
import { Characterization } from '../entities/characterization';
import { Session } from '../entities/session';
import { StampedDataRecord } from '../entities/stamped-data-record';
import { Sysinfo } from '../entities/sysinfo';
import { Translation } from '../entities/translation';
import { UserQuery } from '../entities/user-query';
import { VerseCharacterization } from '../entities/verse-characterization';
const secureEnv = require('secure-env');
const fs = require('fs');

export class ServerConfigService {
  constructor() {
    const secret = fs.readFileSync('.env.key', 'utf8').trim();
    const env: any = secureEnv({ secret });
    global.ServerConfig = {
      dbHost: env.DB_HOST,
      dbUser: env.DB_USER,
      dbPass: env.DB_PASS,
      dbPort: env.DB_PORT,
      dbName: env.DB_NAME,
      opMode: env.OP_MODE,
      serverPort: env.SERVER_PORT,
      expressSessionSecret: env.EXPRESS_SESSION_SECRET,
      corsHosts: env.CORS_HOSTS.split(','),
    };
  }

  public async setUpDataSource(): Promise<DataSource> {
    Logger.log('setting up data source...');
    const dataSource = new DataSource(
      this.getTypeOrmConfig() as DataSourceOptions,
    );
    await dataSource.initialize();
    return dataSource;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const cfg: ServerConfigInterface = global.ServerConfig;
    // console.log('CONFIG:', cfg);
    const entitiesPath = '../dist/entities/*.js';
    return {
      type: 'mysql',
      host: cfg.dbHost,
      port: parseInt(cfg.dbPort),
      username: cfg.dbUser,
      password: cfg.dbPass,
      database: cfg.dbName,
      entities: [
        Religion,
        Tome,
        Book,
        Verse,
        Chapter,
        Characterization,
        Session,
        StampedDataRecord,
        Sysinfo,
        Translation,
        UserQuery,
        VerseCharacterization,
      ],
      // ssl: cfg.opMode === 'production',
      logging: true,
      logger: 'file',
      bigNumberStrings: false,
      autoLoadEntities: true,
    };
  }

  /**
   * Return a set of CORS options for the given allowed host set.
   */
  public corsOptions(allowedHosts: string[]) {
    // Set up CORS options, restricting client hosts to known set and enabling credential storage.
    const cors: CorsOptions = {
      origin: allowedHosts,
      credentials: true,
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
      exposedHeaders: '*, Authorization',
      allowedHeaders:
        'Authorization,Content-Type,Accept,Accept-Encoding,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since',
      preflightContinue: false,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
    };
    return cors;
  }
}
