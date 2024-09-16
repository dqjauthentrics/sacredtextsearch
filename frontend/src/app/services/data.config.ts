import {environment} from '../../environments/environment';
import {EnvironmentConfigInterface} from './environment-config.interface';

export const
	DataConfig: EnvironmentConfigInterface = {
		serverUrl: environment.host +
			(environment.port ? ':' + environment.port : ''),
	};
