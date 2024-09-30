import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ChapterHeader, SearchChapter, SearchService} from '@services/search.service';
import {VerseInterface} from '@backend/verse.interface';

@Component({
	selector: 'chapter-panel',
	templateUrl: 'chapter-panel.component.html',
	styleUrls: ['chapter-panel.scss'],
})
export class ChapterPanelComponent implements OnInit, OnChanges {
	@Input() searchChapter?: SearchChapter;
	@Output() closeRequest = new EventEmitter<void>();
	public icon: string | null = null;
	public chapterHeader: ChapterHeader | null = null;
	public tomeData = {iconOnly: true, verse: ({} as VerseInterface)};

	constructor(public searchService: SearchService) {
	}

	ngOnChanges(_changes: SimpleChanges): void {
		this.setChapterInfo();
	}

	ngOnInit(): void {
		this.setChapterInfo();
	}

	public hideMe() {
		this.closeRequest.emit();
	}

	private scrollToChapter() {
		const div = document.getElementById('chapterScroll');
		if (div) {
			const highlightDivs = div.getElementsByClassName('highlight');
			if (highlightDivs?.length) {
				const tgt = highlightDivs[0];
				tgt.scrollIntoView({behavior: 'smooth', block: 'center'});
			} else {
				console.log('not found');
			}

		} else {
			console.log('bad div');
		}
	}

	private setChapterInfo(): void {
		this.icon = this.searchService.chapter ? this.searchService.chapter.selectedVerse.book.tome.icon : null;
		this.chapterHeader = this.searchService.getChapterHeader(this.searchService.chapter);
		if (this.searchService.chapter) {
			this.tomeData = {iconOnly: true, verse: this.searchService.chapter.selectedVerse};
		}
		setTimeout(() => {
			this.scrollToChapter();
		}, 100);
	}
}
