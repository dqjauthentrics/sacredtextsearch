import {Component} from '@angular/core';
import {SearchService} from '@services/search.service';

@Component({
	selector: 'source',
	templateUrl: 'source.component.html',
	styleUrls: ['source.scss'],
})
export class SourceComponent {
	public SVC: SearchService;

	constructor(public searchService: SearchService) {
		this.SVC = searchService;
	}

	async closeDialog() {
		// @todo
	}
}
