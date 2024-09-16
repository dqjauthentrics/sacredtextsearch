import {Injectable} from '@angular/core';
import cloneDeep from 'lodash.clonedeep';

export interface AdLinkRecord {
	url: string;
	title: string;
	blurb: string;
}

@Injectable()
export class AdLinksService {
	private adSet: Array<AdLinkRecord> = [
		{
			url: 'https://shareasale.com/r.cfm?b=599842&u=2263857&m=52971&urllink=&afftrack=',
			title: 'Audio Books',
			blurb: '50% Off your first digital audiobook.'
		},
		{
			url: 'https://shareasale.com/r.cfm?b=909704&u=2263857&m=67656&urllink=&afftrack=',
			title: 'Customon',
			blurb: ''
		}
	];
	private selectedAds: Array<AdLinkRecord> = [];

	public getAds(nAds: number) {
		let i = 0;
		while (this.selectedAds.length < nAds && i < 100) {
			const pos = Math.floor(Math.random() * this.adSet.length);
			const ad = cloneDeep(this.adSet[pos]);
			if (!this.inList(ad)) {
				this.selectedAds.push(ad);
			}
			i++;
			if (this.selectedAds.length >= this.adSet.length) {
				break;
			}
		}
		return this.selectedAds;
	}

	private inList(ad: AdLinkRecord) {
		for (const listAd of this.selectedAds) {
			if (listAd.url === ad.url) {
				return true;
			}
		}
		return false;
	}
}
