import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchService} from '@services/search.service';
import {VerseInterface} from '@backend/verse.interface';
import {SearchResultInterface} from '@shared/interfaces/search-result.interface';

@Component({
	selector: 'verse-translations-panel',
	templateUrl: 'verse-translations-panel.component.html',
	styleUrls: ['verse-translations.scss'],
})
export class VerseTranslationsPanelComponent implements OnChanges, OnInit {
	@Input() verseTranslations?: SearchResultInterface[];
	@Output() closeRequest = new EventEmitter<void>();
	public title = '';
	public subTitle = '';
	public firstVerse: VerseInterface | null = null;
	public tomeData = {iconOnly: true, verse: ({} as VerseInterface)};

	constructor(private searchService: SearchService) {
	}

	public parentHeight() {
		return (window.innerHeight - 150) + 'px';
	}

	public hideMe() {
		this.closeRequest.emit();
	}

	ngOnInit() {
		this.loadData();
	}

	ngOnChanges(_changes: SimpleChanges): void {
		this.loadData();
	}

	private loadData() {
		if (this.searchService.verseTranslations?.length) {
			const n = this.searchService.verseTranslations.length;
			this.firstVerse = this.searchService.verseTranslations[0].verse;
			this.tomeData = {iconOnly: true, verse: this.firstVerse};
			this.title = this.searchService.namify(this.firstVerse);
			this.subTitle = 'There' + (n > 1 ? ' are ' : ' is just ') + n + ' available translation' + (n > 1 ? 's' : '') + '.';
		}
	}
}
