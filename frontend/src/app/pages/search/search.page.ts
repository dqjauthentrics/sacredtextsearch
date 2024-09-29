import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {SearchService, SourceClick} from '@services/search.service';
import {CollectionService} from '@services/collection.service';
import {SysinfoService} from '@services/sysinfo.service';
import {FilterSelectionService} from '@services/filter-selection.service';
import {CollectionTreeService} from '@services/collection-tree.service';
import {AdService} from '@services/ad.service';
import {GRID_OPSPEC_SEARCH_INFO_TOP_PAGING_BOTTOM, GridConfig, GridItem, GridListEvent} from '@modules/grid/grid.interfaces';
import {GridService} from '@modules/grid/grid.service';
import {Subscription} from 'rxjs';
import {SearchResultInterface} from '@shared/interfaces/search-result.interface';
import {TomeIconComponent} from '@modules/shared/grid-columns/tome-icon/tome-icon.component';
import {VerseBodyCellComponent} from '@modules/shared/grid-columns/verse-body-cell/verse-body-cell.component';
import {TreeviewItem} from '@modules/treeview/models/treeview-item';
import {PopoverDirective} from 'ngx-bootstrap/popover';
import {ContactComponent} from '@modules/shared/contact/contact.component';
import {VerseInterface} from '@backend/verse.interface';
import {ChapterInterface} from '@backend/chapter.interface';
import {TomeInterface} from '@backend/tome.interface';

export const SEARCH_LIST_ID = 'search-results-list';

export interface TomeSelect {
	name: string;
	icon: string;
	selected: boolean;
	dbTransIds: Array<number>;
}

@Component({
	selector: 'app-search',
	templateUrl: 'search.page.html',
	styleUrls: ['search.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearchPage implements OnInit, OnDestroy {
	@ViewChild('contactContainer', {read: ViewContainerRef, static: true}) contactContainer!: ViewContainerRef;
	@ViewChild('contactPop', {static: true}) contactPop!: PopoverDirective;
	@ViewChild('sourceContainer', {read: ViewContainerRef, static: true}) sourceContainer!: ViewContainerRef;
	@ViewChild('sourcePop', {static: true}) sourcePop!: PopoverDirective;

	public showCollectionsFilter = false;
	public showVerseTranslations = false;
	public showChapter = false;
	public canShowAds = false;
	public refreshAds = false;
	public gridConfig?: GridConfig;
	public selectedVerse: VerseInterface | null = null;
	public welcomeShown = false;
	public query: string | null = null;
	public nQueryHits = 0;
	public verseRefresher = true;
	public chapterRefresher?: any;

	public tomeSelects: Array<TomeSelect> = [
		{
			name: 'Biblical',
			icon: '<i class="icon bible fad fa-bible"></i>',
			selected: true,
			dbTransIds: [2, 3]
		},
		{
			name: 'Quranic',
			icon: '<i class="icon quran fad fa-quran"></i>',
			selected: true,
			dbTransIds: [4]
		},
		{
			name: 'Babylonian',
			icon: '<img class="icon" src="/assets/icon/gilgamesh.png" alt=""/>',
			selected: true,
			dbTransIds: [8, 9, 14]
		},
		{
			name: 'Eastern',
			icon: '<img class="icon" src="/assets/icon/eastern.png" alt=""/>',
			selected: true,
			dbTransIds: [10, 13, 15, 16]
		},
		{
			name: 'Mormon',
			icon: '<img class="icon" src="/assets/icon/mormonism.png" alt=""/>',
			selected: true,
			dbTransIds: [5, 6, 7, 11]
		},
		{
			name: 'Other', icon: '<i class="icon other fad fa-scroll-old"></i>',
			selected: true,
			dbTransIds: [12]
		},
	];

	public quickFilters = [
		{name: 'Christianity', checked: true},
		{name: 'Judaism', checked: true},
		{name: 'Islam', checked: true},
		{name: 'Other', checked: true},
	];

	private updateSubscription: Subscription | null = null;
	private sourceClickSubscription: Subscription | null = null;
	private collectionChangeSubscription: Subscription | null = null;
	private configChangeSubscription: Subscription | null = null;

	constructor(
		private gridService: GridService,
		public searchService: SearchService,
		private collectionService: CollectionService,
		private sysinfoService: SysinfoService,
		public collectionTreeService: CollectionTreeService,
		private filterSelectionService: FilterSelectionService,
		private adService: AdService) {
	}

	ngOnInit(): void {
		this.setGridConfig();
		this.setCollection(false);
		this.subscribe();
	}

	ngOnDestroy(): void {
		if (this.collectionChangeSubscription) {
			this.collectionChangeSubscription.unsubscribe();
			this.collectionChangeSubscription = null;
		}
		if (this.sourceClickSubscription) {
			this.sourceClickSubscription.unsubscribe();
			this.sourceClickSubscription = null;
		}
		if (this.updateSubscription) {
			this.updateSubscription.unsubscribe();
			this.updateSubscription = null;
		}
		if (this.configChangeSubscription) {
			this.configChangeSubscription.unsubscribe();
			this.configChangeSubscription = null;
		}
	}

	async popoverContact(popover: PopoverDirective) {
		if (this.contactContainer) {
			this.contactContainer.clear();
			this.contactContainer.createComponent(ContactComponent);
			popover.show();
		}
	}

	async popoverSource() {
		if (this.sourceContainer && this.sourcePop) {
			this.sourceContainer.clear();
			this.sourceContainer.createComponent(ContactComponent);
			this.sourcePop.show();
		}
	}

	public tomeToggle(tomeSelect: TomeSelect) {
		tomeSelect.selected = !tomeSelect.selected;
		this.collectionTreeService.tomeSelectToggle(tomeSelect);
		this.setCollection(true);
	}

	public filterChange() {
		this.searchService.collectionChange.next(this.collectionTreeService.collectionTreeView);
	}

	public viewChapter(verse: VerseInterface) {
		const args = [verse.book.id, verse.translation.id, verse.chapterNumber, verse.id];
		this.searchService.retrieve('chapter/' + args.join('/'))
			.then((chapter: ChapterInterface) => {
				if (chapter) {
					const tome: TomeInterface | null =
						this.collectionService.lookupTome(verse.book.tome.religionId,
							verse.book.tomeId
						);
					if (tome && !verse?.book?.tome) {
						verse.book.tome = tome;
					}
					this.searchService.verseTranslations = null;
					this.searchService.chapter = {
						tome,
						selectedVerse: verse,
						verses: chapter.verses || [],
						name: chapter.name,
						title: chapter.title
					};
					this.showCollectionsFilter = false;
					this.showVerseTranslations = false;
					this.showChapter = true;
					this.chapterRefresher = this.searchService.chapter;
				}
			});
	}

	public viewVerseTranslations(verse: VerseInterface) {
		const args = [
			verse.book.id,
			verse.chapterNumber,
			verse.verseNumber
		];
		this.searchService
			.retrieve('verseTranslations/' + args.join('/'))
			.then((result: SearchResultInterface[]) => {
				this.searchService.chapter = null;
				this.searchService.verseTranslations = result || [];
				this.showVerseTranslations = true;
				this.showCollectionsFilter = false;
				this.showChapter = false;
				this.verseRefresher = !this.verseRefresher;
			});
	}

	private searchByVerse(verse: VerseInterface) {
		this.showVerseTranslations = false;
		this.showCollectionsFilter = false;
		this.showChapter = false;
		this.selectedVerse = verse;
		this.query = this.searchService.namify(this.selectedVerse);
		if (this.gridConfig) {
			this.gridConfig.query = this.query;
			this.gridService.refreshItems(SEARCH_LIST_ID, this.gridConfig);
		}
	}

	private setCollection(refresh: boolean) {
		this.showVerseTranslations = false;
		this.showChapter = false;
		const translationIds = this.collectionTreeService.getSelectedTranslationIds();
		if (this.gridConfig) {
			this.gridConfig.hardConstraints = [
				{value: translationIds, colName: 'translation_id', operator: 'IN'}
			];
			if (refresh) {
				this.gridService.refreshItems(SEARCH_LIST_ID, this.gridConfig);
			}
		}
	}

	private subscribe() {
		this.collectionChangeSubscription =
			this.searchService.collectionChange
				.subscribe((_tree: Array<TreeviewItem>) => {
					this.setCollection(true);
				});
		this.sourceClickSubscription = this.searchService.sourceClick.subscribe((sourceClick: SourceClick) => {
			this.searchService.verse = sourceClick.verse;
			switch (sourceClick.action) {
				case 'source':
					this.popoverSource().then();
					break;
				case 'search':
					this.searchByVerse(sourceClick.verse);
					break;
				case 'view':
					this.viewChapter(sourceClick.verse);
					break;
				case 'translations':
					this.viewVerseTranslations(sourceClick.verse);
					break;
			}
		});

		this.configChangeSubscription = this.gridService.configEvent.subscribe((config: GridConfig) => {
			if (config.query !== this.query) {
				this.welcomeShown = true;
				config.messageNoRecords = 'No matches found.';
				config.noRecordsHideBody = false;
			}
			this.query = config.query || null;
			this.refreshAds = !this.refreshAds;
		});

		this.updateSubscription = this.gridService.listEvent.subscribe((listEvent: GridListEvent) => {
			if (listEvent.listId === SEARCH_LIST_ID && listEvent.query !== this.query) {
				// let cleanQuery: string | null = null;
				// if (listEvent.retrievalResult && listEvent.retrievalResult.page) {
				// 	cleanQuery = listEvent.retrievalResult.page.cleanQuery;
				// }
				if (this.query && this.query.length > 0) {
					this.welcomeShown = true;
				}
				if (this.canShowAds) {
					// eslint-disable-next-line @typescript-eslint/no-this-alias
					const comp = this;
					window.setTimeout(function() {
						comp.adService.update(comp.query || 'dawkins');
					}, 500);
				}
			}
		});
	}

	private setGridConfig() {
		const opSpecs = GRID_OPSPEC_SEARCH_INFO_TOP_PAGING_BOTTOM;
		opSpecs[0].widgets.push({
			name: 'custom',
			customSpec: {
				html: 'Advanced Filter >>',
				onClick: (_items: Array<GridItem>) => {
					this.showCollectionsFilter = !this.showCollectionsFilter;
					this.showVerseTranslations = false;
					this.showChapter = false;
				}
			}
		});
		this.gridService.customComponents = [TomeIconComponent, VerseBodyCellComponent];
		this.gridConfig = {
			//__debug: GRID_DEBUG_LOW,
			uniqueId: SEARCH_LIST_ID,
			suppressInitialLoad: true,
			dataUrl: '/backend/search/grid',
			messageNoRecords: '',
			noRecordsHideBody: true,
			opSpecs,
			pageState: this.gridService.configurePage('rows', 5),
			searchPlaceholder: 'search for matches',
			searchMode: 'return',
			beforeLoad: (config: GridConfig) => {
				const translationIds = this.collectionTreeService.getSelectedTranslationIds();
				config.hardConstraints = [
					{value: translationIds, colName: 'translation_id', operator: 'IN'}
				];
			},
			afterLoad: (verses: Array<VerseInterface>) => {
				if (this.gridConfig) {
					this.nQueryHits = verses.length;
				}
				return verses;
			},
			itemClick: (item: GridItem) => {
				const verse: VerseInterface = item.record.verse;
				this.viewChapter(verse);
			},
			colSpecs: [
				{
					name: 'verse.body', heading: 'Book', bodyCellClasses: 'tome-cell', type: 'custom',
					typeSpec: {
						highlight: true, componentName: 'TomeIconComponent',
						componentInputs: [{name: 'tome', value: undefined}, {name: 'showName', value: true}]
					}
				},
				{
					name: 'verse', heading: 'Verse', type: 'custom',
					typeSpec: {highlight: true, componentName: 'VerseBodyCellComponent'}
				},
				{
					name: 'rank', heading: 'Relevance', type: 'text', headerCellClasses: 'centered', bodyCellClasses: 'middle',
					showMinWidth: 1000,
					render: (item: GridItem) => {
						const hit: SearchResultInterface = item.record;
						if (hit.rank > 0) {
							const bars = hit.rank >= 5 ? '' : '-' + hit.rank.toString();
							return '<i class="rank gray fad fa-2x fa-signal' + bars + '"></i>';
						}
						return '';
					}
				},
				{
					name: 'violence', heading: 'Violence', headerCellClasses: 'centered', bodyCellClasses: 'middle',
					type: 'gauge', typeSpec: {color: 'red', label: 'Violence'}, showMinWidth: 800
				},
				{
					name: 'myth', heading: 'Myth', headerCellClasses: 'centered', bodyCellClasses: 'middle',
					type: 'gauge', typeSpec: {color: 'purple', label: 'Myth'}, showMinWidth: 800
				},
				{
					name: 'submission', heading: 'Submission', headerCellClasses: 'centered', bodyCellClasses: 'middle',
					type: 'gauge', typeSpec: {color: 'navy', label: 'Submission'}, showMinWidth: 800
				}
			]
		};
	}
}
