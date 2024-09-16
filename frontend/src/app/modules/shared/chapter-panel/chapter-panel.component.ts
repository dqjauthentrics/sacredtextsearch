import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ChapterHeader, SearchService} from '@services/search.service';

@Component({
	selector: 'chapter-panel',
	templateUrl: 'chapter-panel.component.html',
	styleUrls: ['chapter-panel.scss'],
})
export class ChapterPanelComponent implements OnInit, OnChanges {
	@Input() refresher = true;
	@Output() hide = new EventEmitter<void>();
	public icon: string | null = null;
	public chapterHeader: ChapterHeader | null = null;

	constructor(public searchService: SearchService) {
	}

	ngOnChanges(): void {
		this.setHeaderInfo();
	}

	ngOnInit(): void {
		this.setHeaderInfo();
	}

	public hideMe() {
		this.hide.emit();
	}

	private setHeaderInfo(): void {
		this.icon = this.searchService.chapter ? this.searchService.chapter.selectedVerse.book.tome.icon : null;
		this.chapterHeader = this.searchService.getChapterHeader(this.searchService.chapter);
	}
}
