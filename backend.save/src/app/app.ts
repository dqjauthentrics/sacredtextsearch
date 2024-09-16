import bodyParser = require('body-parser');
import express = require('express');
import session = require('express-session');
import {CookieOptions, NextFunction, Request, Response} from 'express';
import {Server} from 'http';
import 'reflect-metadata'; // Required by TypeORM.
import {Action, useExpressServer} from 'routing-controllers';
import {createConnection, getConnection, Repository} from 'typeorm';
// import {TypeormStore} from 'typeorm-store';
import {SearchController} from '../controllers/search.controller';
import {Session} from '../entities/Session';
import {CollectionController} from '../controllers/collection.controller';
import {SysinfoController} from '../controllers/sysinfo.controller';
import {AnalyzeController} from '../controllers/analyze.controller';
import {EmailInterface} from '../interfaces/email.interface';
import {EmailController} from '../controllers/email.controller';

export interface AppConfig {
    address: string;
    port: number;
    cookie: CookieOptions;
}

export class App {
    private readonly app: express.Application;
    private server: Server | undefined;

    constructor() {
        this.app = express();
        this.initialize()
            .catch(() => {
                this.gracefulShutdown();
            });
    }

    public deploy(): express.Application {
        return this.app;
    }

    private timeStamp() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return date + ' ' + time;
    }

    private async initialize(): Promise<express.Application | undefined> {
        try {
            const config: AppConfig = {
                address: '',
                port: process.env.port !== undefined ? parseInt(process.env.port, 10) : 3000,
                cookie: {
                    httpOnly: true,
                    secure: false,
                    maxAge: 1000 * 60 * 60,  // Milliseconds; 1 hour.
                },  // @todo These settings may not be appropriate for production. - mdj 14 March 2019
            };

            // Await the creation of a db connection pool manager for TypeORM,
            // which allows us to use the connection in this file.
            await createConnection()
                .then(() => {
                    console.log('[sacred] ' + this.timeStamp() + ': Database connection pool established.');
                })
                .catch(reason => {
                    console.error('[sacred] ' + this.timeStamp() + ': Database connection creation error: ' + `${reason}.`);
                    process.exit(42);
                });

            // Typed as Repository<any> as a workaround to TypeormStore expecting Repository<SessionEntity>
            // which is impossible, as far as I can tell.
            const sessionRepository: Repository<any> = getConnection().getRepository(Session);

            // Middleware for working with request and response bodies.
            this.app.use(bodyParser.json());

            // Middleware for working with sessions; attaches session information to each Express request object
            // (req.session).
            // this.app.use(session({
            //     secret: 'ph4ngU14nd',
            //     resave: false,
            //     saveUninitialized: false,
            //     cookie: config.cookie,
            //     name: 'sidsacred',  // Differentiate from other applications with the same hostname.
            //     store: new TypeormStore({repository: sessionRepository})
            // }));

            /**
             * Register TypeORM with the app instance. Middleware loaded above will modify the req / res
             * objects before they reach the controllers.
             */
            useExpressServer(this.app, {
                cors: {
                    origin: [
                        'ionic://localhost',
                        'http://localhost:8100',
                        'http://localhost:8101',
                        'http://localhost:8111',
                        'http://localhost:8222',
                        'http://localhost:8223',
                        'http://sacredtextsearch.local',
                        'https://sacredtextsearch.local',
                        'http://sacredtextsearch.com',
                        'https://sacredtextsearch.com',
                        'sacredtextsearch.com'
                    ],
                    credentials: true,
                    optionsSuccessStatus: 204,
                },
                defaults: {nullResultCode: 404, undefinedResultCode: 204, paramOptions: {required: true}},
                errorOverridingMap: {
                    ForbiddenError: {message: 'Access denied.'},
                    ValidationError: {httpCode: '400', message: 'Validation failed.'}
                },
                routePrefix: '/api',
                controllers: [SearchController, CollectionController, SysinfoController, AnalyzeController, EmailController],
                authorizationChecker: async (action: Action, roles: string[]) => {
                    const actionSession = action.request.session;
                    return !!actionSession.user;
                }
            });

            /**
             * Primitive / faux error handling. Sets status 500 if no status present on error.
             * Express's default error handling still occurs after this.
             */
            this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                if (res.headersSent) {
                    return next(err);
                }
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                res.status(err.statusCode).send(err.message);
            });

            this.server = this.app.listen(config.port,
                config.address,
                () => {
                    console.log('[sacred] ' + this.timeStamp() + ': Server listening on port ', config.port);
                }).on('error', (error) => {
                console.log('[sacred] ' + this.timeStamp() + ': App error event: ', error);
            });

            process.on('SIGTERM', () => {
                this.gracefulShutdown();
            });

            return new Promise<express.Application>(resolve => {
                resolve(this.app);
            });
        }
        catch (e) {
            console.error('[sacred] ' + this.timeStamp() + ': Caught: ' + `${e}`);
            return new Promise<undefined>((resolve, reject) => {
                reject();
            });
        }
    }

    /**
     * Not sure if this is necessary.  A node process will exit automatically, but may not wait for
     * asynchronous things to finish.
     */
    private gracefulShutdown(): void {
        const connection = getConnection();
        if (connection) {
            connection.close()
                      .then(() => {
                          console.log('[sacred - TypeORM] ' + this.timeStamp() + ': Closing connection pool.');
                          if (this.server) {
                              this.server.close(() => {
                                  console.log('[sacred] ' + this.timeStamp() + ': Shutting down server.');
                                  process.exit(0);
                              });
                          }
                      });
        }
        else if (this.server) {
            this.server.close(() => {
                console.log('[sacred] ' + this.timeStamp() + ': Shutting down server.');
                process.exit(0);
            });
        }
    }
}
