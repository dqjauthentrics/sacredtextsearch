import {Component, Input} from '@angular/core';
import {AdLinkRecord, AdLinksService} from './ad-links.service';

@Component({
	selector: 'ad-links-widget',
	templateUrl: 'ad-links.widget.html',
	styleUrls: ['ad-links.scss']
})
export class AdLinksWidget {
	@Input() title = 'Sponsored Links';
	@Input() nAds = 3;

	constructor(public adLinksService: AdLinksService) {
	}

	public goToAd(ad: AdLinkRecord) {
		window.open(ad.url, '_blank');
	}
}

