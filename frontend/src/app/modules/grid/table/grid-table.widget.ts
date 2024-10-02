import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {GridService} from '../grid.service';
import {GridColFilter, GridColSpec, GridConfig, GridItem, GridListEvent, GridPositions} from '../grid.interfaces';
import {Router} from '@angular/router';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {GridLinkService} from '../grid-link.service';
import * as Mark from 'mark.js';
import {MarkOptions} from 'mark.js';

@Component({
	selector: 'grid-table',
	templateUrl: './grid-table.widget.html',
	styleUrls: ['../grid.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridTableWidget implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('gridTable', {static: false}) gridTable: ElementRef | undefined;
	@ViewChild('dragMirror', {static: false}) dragMirror?: ElementRef<HTMLDivElement>;
	@Input() config: GridConfig | undefined;
	@Output() itemSelectToggle: EventEmitter<GridItem> = new EventEmitter<GridItem>();
	@Output() reorderChange: EventEmitter<Array<GridItem>> = new EventEmitter<Array<GridItem>>();
	@Output() checkChange: EventEmitter<Array<GridItem>> = new EventEmitter<Array<GridItem>>();

	public tableWidth = 0;
	public allChecked = false;
	public dragBagName = 'gridDragBag';
	private dropSubscribe: Subscription | null = null;
	private listChangeSub: Subscription | null = null;

	constructor(private router: Router,
				private gridService: GridService,
				private dragulaService: DragulaService,
				private gridLinkService: GridLinkService,
				private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.windowResize();
		this.listChangeSub = this.gridService.listEvent.subscribe((event: GridListEvent) => {
			this.highlight(this.config, event);
		});
	}

	ngAfterViewInit(): void {
		if (this.config) {
			// Do dragula init during AfterViewInit lifecycle to ensure referenced ViewChildren are available.
			this.dragBagName = [this.dragBagName, this.config.uniqueId].join('-');
			this.setUpReordering(this.config);
		}
		this.windowResize();
	}

	ngOnDestroy(): void {
		// Clean up dragula bags and unsubscribe from drop events to prevent stacking subscriptions on identical dragBagNames.
		this.unsubscribeReordering();
		if (this.listChangeSub) {
			this.listChangeSub.unsubscribe();
			this.listChangeSub = null;
		}
	}

	public dragChange(config: GridConfig, items: Array<GridItem>) {
		config.__items = items;
	}

	public properPosition(config: GridConfig, spec: string, subspec: string | null, position: GridPositions) {
		let specRecord: any = null;
		if ((config as any)[spec]) {
			specRecord = (config as any)[spec];
			if (subspec && specRecord[subspec]) {
				specRecord = specRecord[subspec];
			}
		}
		return specRecord ? specRecord.position === position : false;
	}

	public isEditing(config: GridConfig) {
		return config.__inlineEditingIndex !== undefined && config.__inlineEditingIndex !== false;
	}

	public getRowClasses(config: GridConfig, item: GridItem, itemIndex: number): string {
		let classes = (itemIndex % 2 === 0 ? 'even' : 'odd') + (item.__deleted ? ' deleted' : '');
		if (config.itemClick) {
			classes += ' clickable';
		}
		if (config.tableSpec && config.tableSpec.rowClassCb) {
			classes += ' ' + config.tableSpec.rowClassCb(item);
		}
		if (config.__inlineEditingIndex === itemIndex) {
			classes += ' editing';
		}
		return classes;
	}

	public allCheckToggle(config: GridConfig) {
		if (config.__items && config.tableSpec && config.tableSpec.checkSpec) {
			const col = config.tableSpec.checkSpec.colName;
			for (const item of config.__items) {
				item.record[col] = this.allChecked ? 1 : 0;
			}
			this.checkChange.emit(config.__items);
		}
	}

	public checkToggle(config: GridConfig, item: GridItem) {
		if (config.tableSpec && config.tableSpec.checkSpec) {
			const col = config.tableSpec.checkSpec.colName;
			item.record[col] = item.record[col] ? 0 : 1;
			this.checkChange.emit(config.__items);
		}
	}

	public itemClick(item: GridItem) {
		if (this.config && this.config.itemClick) {
			const itemSelectChange = this.gridLinkService.handleItemClick(this.config, item, this.config.itemClick);
			if (itemSelectChange) {
				this.itemSelectToggle.emit(item);
			}
		}
	}

	public windowResize() {
		if (this.gridTable) {
			this.tableWidth = this.gridTable.nativeElement.offsetWidth;
			if (this.changeDetector) {
				this.changeDetector.detectChanges();
			}
		}
	}

	public showCol(colSpec: GridColSpec): boolean {
		return (this.tableWidth >= (colSpec.showMinWidth || 0)) &&
			(this.tableWidth <= (colSpec.showMaxWidth || 99999));
	}

	public sort(colSpec: GridColSpec): void {
		if (this.config) {
			this.gridService.sortColChange(this.config, colSpec);
		}
	}

	public search(colSpec: GridColSpec, searchText: string | null | undefined): void {
		if (this.config) {
			if (!this.config.currentFilters) {
				this.config.currentFilters = [];
			}
			const filter = this.findFilter(this.config.currentFilters, colSpec);
			if (filter) {
				filter.query = searchText || '';
			} else {
				this.config.currentFilters.push({name: colSpec.name, query: searchText || ''});
			}
			this.gridService.searchColChange(this.config, colSpec);
		}
	}

	private highlight(config: GridConfig | null | undefined, event: GridListEvent) {
		const handle = setInterval(() => {
			if (config) {
				const q = config.query || event.query;
				if (q && q.length > 0) {
					const ignorePunctuation = ":;.,-–—‒_(){}[]!'\"+=".split("");
					const marker = new Mark(document.querySelectorAll('.highlightable'));
					marker.unmark();
					const options: MarkOptions = {
						caseSensitive: false,
						separateWordSearch: true,
						diacritics: true,
						ignoreJoiners: true,
						ignorePunctuation
					}
					marker.mark(q, options);
					this.gridService.highlightIntervalCount++;
					if (this.gridService.highlightIntervalCount > 5) {
						this.gridService.highlightIntervalCount = 0;
						clearInterval(handle);
					}
				}
			}
		}, 500);
	}

	private setUpReordering(config: GridConfig) {
		this.unsubscribeReordering();
		const dragGroup = this.dragulaService.find(this.dragBagName) || this.dragulaService.createGroup(this.dragBagName, {});
		if (dragGroup) {
			Object.assign(dragGroup.options, {
				// Only allow moving when dragDropEnabled, effectively disabling dragula otherwise.  Drag by handle only when allowed.
				moves: (el: HTMLElement, container: any, handle: any) => config.dragDropEnabled ? handle && handle.className && handle.className === 'drag-handle' : false,
				// Use the <tbody #dragMirror> (in lieu of default <body>) as a container to better retain element styles while dragging.
				mirrorContainer: this.dragMirror && this.dragMirror.nativeElement ? this.dragMirror.nativeElement : undefined
			});
		}
		if (config.dragDropEnabled) {
			this.dropSubscribe = this.dragulaService.drop(this.dragBagName).subscribe(() => {
				if (config.__items) {
					let i = 0;
					for (const item of config.__items) {
						item.__expanded = false;
						item.__index = i;
						i++;
					}
					this.reorderChange.emit(config.__items);
				}
			});
		}
	}

	private unsubscribeReordering() {
		try {
			if (this.dropSubscribe) {
				this.dropSubscribe.unsubscribe();
			}
			const bag = this.dragulaService.find(this.dragBagName);
			if (bag) {
				this.dragulaService.destroy(this.dragBagName);
			}
		} catch (exception) {
			console.error(exception);
		}
	}

	private findFilter(currentFilters: Array<GridColFilter>, colSpec: GridColSpec) {
		for (const filter of currentFilters) {
			if (filter.name === colSpec.name) {
				return filter;
			}
		}
		return null;
	}
}
