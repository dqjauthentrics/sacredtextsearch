import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '@services/search.service';
import {VerseInterface} from '@backend/verse.interface';

@Component({
	selector: 'verse-body-cell',
	templateUrl: 'verse-body-cell.component.html',
	styleUrls: ['verse-body-cell.scss'],
})
export class VerseBodyCellComponent implements OnInit {
	@Input() data: any;

	public verse: VerseInterface | null = null;

	constructor(public searchService: SearchService) {
	}

	ngOnInit(): void {
		this.verse = this.data.verse;
	}

	refresh(_params: any): boolean {
		return true;
	}
}
