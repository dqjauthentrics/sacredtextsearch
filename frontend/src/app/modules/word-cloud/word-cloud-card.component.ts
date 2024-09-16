import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {WordCloudData, WordCloudDirective} from 'angular4-word-cloud';
import {SearchResultInterface} from '@shared/interfaces/search-result.interface';
import {TextAnalysis} from '@shared/components/text-analysis';
import {Subscription} from 'rxjs';
import {GridListEvent} from '../grid/grid.interfaces';
import {GridService} from '../grid/grid.service';
import {SEARCH_LIST_ID} from '../../pages/search/search.page';
import {WordCloudData, WordCloudDirective} from './word-cloud.directive';

@Component({
	selector: 'word-cloud-card',
	templateUrl: 'word-cloud-card.component.html',
	styleUrls: ['word-cloud-card.scss'],
})
export class WordCloudCardComponent implements OnInit, OnDestroy {
	@ViewChild('cloud', {static: false}) cloud: WordCloudDirective | null = null;

	public cloudData: Array<WordCloudData> | null = null;
	public options = {
		settings: {minFontSize: 10, maxFontSize: 150,},
		margin: {top: 10, right: 10, bottom: 10, left: 10},
		labels: false
	};
	public textAnalysis = new TextAnalysis();
	public updateSubscription: Subscription | null = null;

	constructor(private gridService: GridService) {
	}

	@HostListener('window:resize', ['$event'])
	public onResize(_event: any) {
		this.update();
	}

	public getWidth() {
		const el = document.getElementById('cloudWrapper');
		if (el) {
			const w = el.offsetWidth;
			return w;
		}
		return 200;
	}

	public update(wordCloud: Array<WordCloudData> | null = null) {
		if (wordCloud) {
			this.cloudData = wordCloud;
		}
		if (this.cloudData && this.cloudData.length > 0) {
			window.setTimeout(() => {
				if (this.cloud) {
					this.cloud.update();
				}
			}, 100);
		}
	}

	ngOnInit(): void {
		this.updateSubscription = this.gridService.listEvent.subscribe((listEvent: GridListEvent) => {
			if (listEvent.listId === SEARCH_LIST_ID) {
				const hits: Array<SearchResultInterface> = [];
				for (const item of listEvent.items) {
					hits.push(item.record as SearchResultInterface);
				}
				this.cloudData = this.textAnalysis.buildWordFrequencyList(hits);
				this.update();
			}
		});
	}

	ngOnDestroy(): void {
		if (this.updateSubscription) {
			this.updateSubscription.unsubscribe();
		}
	}

}
