"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const religion_1 = require("../entities/religion");
const verse_1 = require("../entities/verse");
const tome_1 = require("../entities/tome");
const book_1 = require("../entities/book");
const chapter_1 = require("../entities/chapter");
const characterization_1 = require("../entities/characterization");
const session_1 = require("../entities/session");
const stamped_data_record_1 = require("../entities/stamped-data-record");
const sysinfo_1 = require("../entities/sysinfo");
const translation_1 = require("../entities/translation");
const user_query_1 = require("../entities/user-query");
const verse_characterization_1 = require("../entities/verse-characterization");
const secureEnv = require('secure-env');
const fs = require('fs');
class ServerConfigService {
    constructor() {
        const secret = fs.readFileSync('.env.key', 'utf8').trim();
        const env = secureEnv({ secret });
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
    async setUpDataSource() {
        common_1.Logger.log('setting up data source...');
        const dataSource = new typeorm_1.DataSource(this.getTypeOrmConfig());
        await dataSource.initialize();
        return dataSource;
    }
    getTypeOrmConfig() {
        const cfg = global.ServerConfig;
        const entitiesPath = '../dist/entities/*.js';
        return {
            type: 'mysql',
            host: cfg.dbHost,
            port: parseInt(cfg.dbPort),
            username: cfg.dbUser,
            password: cfg.dbPass,
            database: cfg.dbName,
            entities: [
                religion_1.Religion,
                tome_1.Tome,
                book_1.Book,
                verse_1.Verse,
                chapter_1.Chapter,
                characterization_1.Characterization,
                session_1.Session,
                stamped_data_record_1.StampedDataRecord,
                sysinfo_1.Sysinfo,
                translation_1.Translation,
                user_query_1.UserQuery,
                verse_characterization_1.VerseCharacterization,
            ],
            logging: true,
            logger: 'file',
            bigNumberStrings: false,
            autoLoadEntities: true,
        };
    }
    corsOptions(allowedHosts) {
        const cors = {
            origin: allowedHosts,
            credentials: true,
            methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
            exposedHeaders: '*, Authorization',
            allowedHeaders: 'Authorization,Content-Type,Accept,Accept-Encoding,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since',
            preflightContinue: false,
            optionsSuccessStatus: common_1.HttpStatus.NO_CONTENT,
        };
        return cors;
    }
}
exports.ServerConfigService = ServerConfigService;
//# sourceMappingURL=server-config.service.js.map