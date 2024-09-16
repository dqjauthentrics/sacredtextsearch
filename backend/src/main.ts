import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { ServerConfigService } from './config/server-config.service';

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const SERVER_PREFIX = 'backend';
const logger: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

async function bootstrap() {
  try {
    // Set up the app constraints.
    // N.B. This loads environment variables and data source through the use of static variables.
    const serverConfig = new ServerConfigService();
    global.ServerConfig.dataSource = await serverConfig.setUpDataSource();
    Logger.log(`operational mode: ${global.ServerConfig.opMode}`);
    Logger.log('allowed host(s): ' + global.ServerConfig.corsHosts.join(', '));

    // Instantiate an app, specifying logging and CORS options.
    const cors = serverConfig.corsOptions(global.ServerConfig.corsHosts);
    Logger.log(`creating app...`);
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger,
      cors,
    });
    Logger.log(`app instantiated: ${logger.join(',')}`);
    global.ServerConfig.app = app;

    // Global route prefix for all controllers.
    app.setGlobalPrefix(SERVER_PREFIX);
    Logger.log(`controller prefix: ${SERVER_PREFIX}`);

    // Compress client response bodies for performance improvement.
    Logger.log('using compression');
    app.use(compression());

    // Use cookie parser with same secret used by express-session.
    app.use(cookieParser(global.ServerConfig.expressSessionSecret));

    Logger.log('setting upload and post limits...');
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    app.use(bodyParser.text({ limit: '100mb' }));
    app.use(
      fileUpload({
        limits: { fileSize: 500 * 1024 * 1024 },
        useTempFiles: true,
      }),
    );

    // Listen for client communications on the port specified in the environment.
    Logger.log(`listening on port: ${global.ServerConfig.serverPort}`);
    await app.listen(global.ServerConfig.serverPort);
  } catch (exception: any) {
    console.log('APP CREATION EXCEPTION:', exception);
  }
}

bootstrap().catch((exception: any) => {
  console.log('APP BOOTSTRAP EXCEPTION:', exception);
});
