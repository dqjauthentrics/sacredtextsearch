// global.d.ts
import {ServerConfigInterface} from './src/config/server-config.interface';

declare namespace NodeJS {
	interface Global {
		ServerConfig: ServerConfigInterface;
	}
}
