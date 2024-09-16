import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SearchService} from '@services/search.service';
import {VerseInterface} from '@backend/verse.interface';

@Component({
	selector: 'verse-translations-panel',
	templateUrl: 'verse-translations-panel.component.html',
	styleUrls: ['verse-translations.scss'],
})
export class VerseTranslationsPanelComponent implements OnChanges {
	@Input() refresher = true;
	@Output() hide = new EventEmitter<void>();
	public SVC: SearchService;
	public title = '';
	public subTitle = '';
	public firstVerse: VerseInterface | null = null;
	public tomeData = {iconOnly: true, verse: ({} as VerseInterface)};

	constructor(private searchService: SearchService) {
		this.SVC = searchService;
	}

	@HostListener('document:keydown.escape', ['$event'])
	onKeydownHandler(_event: KeyboardEvent) {
		this.hide.emit();
	}

	public parentHeight() {
		return (window.innerHeight - 150) + 'px';
	}

	public hideMe() {
		this.hide.emit();
	}

	ngOnChanges(_changes: SimpleChanges): void {
		if (this.searchService.verseTranslations?.length) {
			const n = this.searchService.verseTranslations.length;
			this.firstVerse = this.searchService.verseTranslations[0].verse;
			this.tomeData = {iconOnly: true, verse: this.firstVerse};
			this.title = this.searchService.namify(this.firstVerse);
			this.subTitle = 'There' + (n > 1 ? ' are ' : ' is just ') + n + ' available translation' + (n > 1 ? 's' : '') + '.';
		}
	}
}
