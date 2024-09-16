"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const compression = require("compression");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
const server_config_service_1 = require("./config/server-config.service");
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const SERVER_PREFIX = 'backend';
const logger = ['log', 'error', 'warn', 'debug', 'verbose'];
async function bootstrap() {
    try {
        const serverConfig = new server_config_service_1.ServerConfigService();
        global.ServerConfig.dataSource = await serverConfig.setUpDataSource();
        common_1.Logger.log(`operational mode: ${global.ServerConfig.opMode}`);
        common_1.Logger.log('allowed host(s): ' + global.ServerConfig.corsHosts.join(', '));
        const cors = serverConfig.corsOptions(global.ServerConfig.corsHosts);
        common_1.Logger.log(`creating app...`);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger,
            cors,
        });
        common_1.Logger.log(`app instantiated: ${logger.join(',')}`);
        global.ServerConfig.app = app;
        app.setGlobalPrefix(SERVER_PREFIX);
        common_1.Logger.log(`controller prefix: ${SERVER_PREFIX}`);
        common_1.Logger.log('using compression');
        app.use(compression());
        app.use(cookieParser(global.ServerConfig.expressSessionSecret));
        common_1.Logger.log('setting upload and post limits...');
        app.use(bodyParser.json({ limit: '100mb' }));
        app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
        app.use(bodyParser.text({ limit: '100mb' }));
        app.use(fileUpload({
            limits: { fileSize: 500 * 1024 * 1024 },
            useTempFiles: true,
        }));
        common_1.Logger.log(`listening on port: ${global.ServerConfig.serverPort}`);
        await app.listen(global.ServerConfig.serverPort);
    }
    catch (exception) {
        console.log('APP CREATION EXCEPTION:', exception);
    }
}
bootstrap().catch((exception) => {
    console.log('APP BOOTSTRAP EXCEPTION:', exception);
});
//# sourceMappingURL=main.js.map