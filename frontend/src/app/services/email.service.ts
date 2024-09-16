import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmailInterface} from '@shared/interfaces/email.interface';
import {AppDataService} from './app-data.service';
import {GrowlService} from './growl.service';

@Injectable()
export class EmailService extends AppDataService<any> {

	constructor(
		public http: HttpClient,
		public growlService: GrowlService
	) {
		super('email', http, growlService);
	}

	public send(name: string | null, email: string | null, body: string | null): Promise<string | null> {
		return new Promise((resolve) => {
			if (name && email && body) {
				const data: EmailInterface = {name: name, email: email, body: body};
				return this.request('POST', {urlSegment: 'send', data}).then((result: any) => {
					resolve(result && result.accepted && result.accepted.length > 0 ? null : 'error');
				}).catch(() => {
					resolve('error');
				});
			}
			resolve('invalid');
		});
	}
}
