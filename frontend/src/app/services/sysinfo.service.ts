import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppDataService} from './app-data.service';
import {GrowlService} from './growl.service';
import {DataResult} from '@shared/interfaces/data-result';
import {SysinfoInterface} from '@backend/sysinfo.interface';

@Injectable({
	providedIn: 'root',
})
export class SysinfoService extends AppDataService<any> {
	public sysinfo: SysinfoInterface | null = null;

	constructor(
		public http: HttpClient,
		public growlService: GrowlService) {
		super('sysinfo', http, growlService);
	}

	public getLastUpdate() {
		return this
			.getData({urlSegment: 'get'})
			.then((result: SysinfoInterface) => {
				if (result) {
					environment.lastCollectionUpdate = result.lastCollectionUpdate;
					this.sysinfo = result;
				}
			});
	}
}
