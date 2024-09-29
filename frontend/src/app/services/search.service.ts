import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {QueryOrderInterface} from '@shared/interfaces/query.interface';
import {Subject} from 'rxjs';
import {IGetRowsParams} from 'ag-grid-community';
import {TreeviewItem} from '@modules/treeview/models/treeview-item';
import {AppDataService} from './app-data.service';
import {SearchResultInterface} from '@shared/interfaces/search-result.interface';
import {GrowlService} from './growl.service';
import {VerseInterface} from '@backend/verse.interface';
import {TomeInterface} from '@backend/tome.interface';

export interface SourceClick {
	verse: VerseInterface;
	action: string;
}

export interface SearchChapter {
	tome: TomeInterface | null;
	selectedVerse: VerseInterface;
	verses: Array<VerseInterface>;
	title: string | null | undefined;
	name: string | null | undefined;
}

export interface ChapterHeader {
	tomeName: string;
	bookName: string;
	tomeBook: string;
	chapterName: string;
	translationText: string;
}

/**
 * Provides basic storage for Verse search records.
 */
@Injectable()
export class SearchService extends AppDataService<any> {
	public chapter: SearchChapter | null = null; // for page slide-out
	public verseTranslations: Array<SearchResultInterface> | null = null; // for page slide-out
	public verse: VerseInterface | null = null;           // for popovers
	public sidePanelIsOpen = false;
	public sourceClick: Subject<SourceClick> = new Subject<SourceClick>();
	public collectionChange: Subject<Array<TreeviewItem>> = new Subject<Array<TreeviewItem>>();
	public sidePanelChange: Subject<boolean> = new Subject<boolean>();

	constructor(public http: HttpClient, public growlService: GrowlService) {
		super('search', http, growlService);
	}

	public getChapterHeader(chapter: SearchChapter | undefined | null): ChapterHeader {
		const header: ChapterHeader = {tomeName: '', bookName: '', tomeBook: '', chapterName: '', translationText: ''};
		if (chapter) {
			const verse: VerseInterface = chapter.selectedVerse;
			const t = verse.translation;
			if (t) {
				header.translationText = t.name;
			}
			if (chapter.name || chapter.title) {
				header.chapterName = this.concatMaybe(chapter.name, chapter.title);
			} else {
				header.chapterName = 'Chapter ' + chapter.selectedVerse.chapterNumber
			}
			header.tomeName = chapter.tome ? chapter.tome.name : '';
			header.bookName = chapter.selectedVerse.book.name;
			header.tomeBook = this.concatMaybe(header.tomeName, header.bookName);
		}
		return header;
	}

	public setPanelState(isOpen: boolean) {
		this.sidePanelIsOpen = isOpen;
		this.sidePanelChange.next(isOpen);
	}

	public browserWidth(): number {
		return Math.max(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth
		);
	}

	public namify(verse: VerseInterface, format = '%t:%b:%c:%v'): string {
		let name = format;
		let t = '';
		let b = '';
		const c = verse.chapterNumber.toString();
		const v = verse.verseNumber.toString();
		if (verse.book) {
			b = verse.book.name;
			if (verse.book.tome && verse.book.tome.name !== b) { // N.B. singleton book names are redundant to tomes
				t = verse.book.tome.name;
			}
		}
		name = name.replace('%t', t);
		name = name.replace('%b', b);
		name = name.replace('%c', c);
		name = name.replace('%v', v);
		if (name.length > 0 && name.charAt(0) === ':') {
			name = name.substring(1);
		}
		return name;
	}

	public getSelectedOrder(params: IGetRowsParams): Array<QueryOrderInterface> | null {
		if (params && params.sortModel) {
			const ordering: Array<QueryOrderInterface> = [];
			for (let i = 0; i < params.sortModel.length; i++) {
				const dir = params.sortModel[i].sort;
				const col = params.sortModel[i].colId;
				ordering.push({column: col, direction: dir});
			}
			return ordering;
		}
		return null;
	}

	private concatMaybe(str1: string | undefined | null, str2: string | undefined | null, sep = ' '): string {
		let combined = '';
		if (str1) {
			combined = str1;
		}
		if (str2 && str2.length > 0 && str2 !== str1) {
			combined += sep + str2;
		}
		return combined.trim();
	}

	private safeStr(str: string | undefined | null) {
		if (str) {
			return str;
		}
		return '';
	}
}
