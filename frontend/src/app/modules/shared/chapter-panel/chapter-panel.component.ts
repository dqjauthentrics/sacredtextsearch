import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ChapterHeader, SearchChapter, SearchService} from '@services/search.service';

@Component({
	selector: 'chapter-panel',
	templateUrl: 'chapter-panel.component.html',
	styleUrls: ['chapter-panel.scss'],
})
export class ChapterPanelComponent implements OnInit, OnChanges {
	@Input() searchChapter?: SearchChapter;
	@Output() hide = new EventEmitter<void>();
	public icon: string | null = null;
	public chapterHeader: ChapterHeader | null = null;

	constructor(public searchService: SearchService) {
	}

	ngOnChanges(): void {
		this.setHeaderInfo();
		setTimeout(() => {
			this.scrollToChapter();
		}, 100);
	}

	ngOnInit(): void {
		this.setHeaderInfo();
	}

	public hideMe() {
		this.hide.emit();
	}

	private scrollToChapter() {
		console.log('scrolling...');
		const div = document.getElementById('chapterScroll');
		if (div) {
			const highlightDivs = div.getElementsByClassName('highlight');
			if (highlightDivs) {
				highlightDivs[0].scrollIntoView({behavior: 'smooth', block: 'center'});
			} else {
				console.log('not found');
			}
		} else {
			console.log('bad div');
		}
	}

	private setHeaderInfo(): void {
		this.icon = this.searchService.chapter ? this.searchService.chapter.selectedVerse.book.tome.icon : null;
		this.chapterHeader = this.searchService.getChapterHeader(this.searchService.chapter);
	}
}
