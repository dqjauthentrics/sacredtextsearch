import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CollectionService} from '@services/collection.service';
import {SearchService} from '@services/search.service';
import {TomeInterface} from '@backend/tome.interface';
import {VerseInterface} from '@backend/verse.interface';

@Component({
	selector: 'tome-icon',
	templateUrl: 'tome-icon.component.html',
	styleUrls: ['tome-icon.scss'],
})
export class TomeIconComponent implements OnInit, OnChanges {
	@Input() data: any;
	@Input() showName = true;

	public verse: VerseInterface | null = null;
	public tome: TomeInterface | null = null;
	public icon: any = ['fas', 'book'];
	public iconOnly = false;
	public translation = '';

	constructor(
		private collectionService: CollectionService,
		public searchService: SearchService
	) {
	}

	ngOnChanges(_changes: SimpleChanges) {
		this.update();
	}

	ngOnInit(): void {
		this.update();
	}

	public refresh(_params: any): boolean {
		return true;
	}

	public sourceClick(event: MouseEvent | KeyboardEvent, action: string) {
		event.stopImmediatePropagation();
		if (this.verse) {
			if (action !== 'source') { // source is handled locally
				this.searchService.sourceClick.next({verse: this.verse, action: action});
			}
		}
	}

	private update() {
		this.verse = this.data.verse;
		this.showName = this.data.showName !== undefined ? this.data.showName : true;
		this.iconOnly = this.data.iconOnly;
		if (this.verse && this.verse.translation && this.verse.translation.name) {
			this.translation = this.verse.translation.name;
			if (this.translation !== 'Original English') {
				this.translation = 'Trans: ' + this.translation;
			}
		}
		if (this.verse && this.verse.book) {
			this.tome = this.collectionService
							.lookupTome(this.verse.book.tome.religionId, this.verse.book.tomeId);
			if (this.tome) {
				this.icon = ['fas', this.tome.icon];
			}
		}
	}
}
