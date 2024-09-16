import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataConfig} from './data.config';
import {DataService} from './base-data.service';
import {GrowlService} from './growl.service';

@Injectable()
export class AppDataService<T> extends DataService<T> {
	constructor(
		@Inject('controller') controller: string,
		public http: HttpClient,
		public growlService: GrowlService
	) {
		super(controller, DataConfig.serverUrl + '/backend', http, growlService);
	}
}
