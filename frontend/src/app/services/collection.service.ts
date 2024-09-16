import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataResult} from '@shared/interfaces/data-result';
import {environment} from '../../environments/environment';
import {AppDataService} from './app-data.service';
import {GrowlService} from './growl.service';
import {TomeInterface} from '@backend/tome.interface';
import {ReligionInterface} from '@backend/religion.interface';

/**
 * Provides basic storage for Tome/Translation records..
 */
@Injectable()
export class CollectionService extends AppDataService<any> {
	public readonly STORAGE_NAME = 'collection';
	public collection: Array<ReligionInterface> = [];

	constructor(
		public http: HttpClient,
		public growlService: GrowlService
	) {
		super('collection', http, growlService);
		this.getCollection().then();
	}

	public getCollection(): Promise<Array<ReligionInterface>> {
		const now = new Date();
		const nowStamp = now.getTime();
		let last: any = '';
		// console.log('getCollection: ', environment.last_collection_update);
		if (environment.lastCollectionUpdate !== null) {
			last = environment.lastCollectionUpdate;
		}
		const lastDate = Date.parse(last);
		const diff = nowStamp - lastDate;
		return new Promise((resolve) => {
			const collectionJson = localStorage.getItem(this.STORAGE_NAME);
			try {
				if (collectionJson && collectionJson.length > 0 && diff <= 0) {
					const tmp = JSON.parse(collectionJson);
					// console.log('using current collection');
					this.collection = tmp;
				}
			} catch (exception) {
			}
			if (this.collection && this.collection.length > 0) {
				// console.log('collection from storage', this.collection);
				resolve(this.collection);
			} else {
				// console.log('retrieve collection, from ' + calledFrom);
				resolve(this.retrieveCollection());
			}
		});
	}

	public findTome(
		religionId: number,
		tomeId: number,
		religions: Array<ReligionInterface>
	): TomeInterface | null {
		for (let i = 0; i < religions.length; i++) {
			const religion = religions[i];
			for (let j = 0; j < religion.tomes.length; j++) {
				if (religion.tomes[j].id === tomeId) {
					return religion.tomes[j];
				}
			}
			if (religion.children && religion.children.length > 0) {
				const childTome = this.findTome(religionId, tomeId, religion.children);
				if (childTome) {
					return childTome;
				}
			}
		}
		return null;
	}

	public lookupTome(religionId: number, tomeId: number) {
		return this.findTome(religionId, tomeId, this.collection);
	}

	private retrieveCollection(): Promise<Array<ReligionInterface>> {
		return new Promise((resolve) => {
			return this
				.request('GET', {urlSegment: 'tree'})
				.then((result: DataResult<TomeInterface>) => {
					const data: any = result.data;
					this.collection = data;
					localStorage.setItem(this.STORAGE_NAME,
						JSON.stringify(this.collection)
					);
					resolve(this.collection);
				});
		});
	}
}
