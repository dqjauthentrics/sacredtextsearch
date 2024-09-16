import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {GridConfig, GridItem, GridItemEvent, GridPageState, GridPositions} from './grid.interfaces';
import {GridService} from './grid.service';
import {GridFacetSpec} from './facets/grid-facet.widget';
import {Subscription} from 'rxjs';

@Component({
	selector: 'grid',
	templateUrl: './grid.widget.html',
	styleUrls: ['./grid.scss']
})
export class GridWidget implements OnInit, AfterViewInit, OnChanges {
	@ViewChild('gridContainer', {static: false}) gridContainer: ElementRef | undefined;
	@Input() config: GridConfig | undefined;
	@Input() refresh = false;
	@Output() itemSelectToggle: EventEmitter<GridItem> = new EventEmitter<GridItem>();
	@Output() listReordered: EventEmitter<Array<GridItem>> = new EventEmitter<Array<GridItem>>();
	@Output() recordAdded: EventEmitter<GridItem> = new EventEmitter<GridItem>();
	@Output() checkChanges: EventEmitter<Array<GridItem>> = new EventEmitter<Array<GridItem>>();

	private itemEventSubscription: Subscription | undefined;

	constructor(public gridService: GridService) {
	}

	ngOnInit(): void {
		this.itemEventSubscription = this.gridService.itemEvent.subscribe((itemEvent: GridItemEvent) => {
			if (this.config) {
				this.gridService.handleItemEvent(this.config, itemEvent);
			}
		});
		if (this.config) {
			this.gridService.initialize(this.config);
		}
	}

	ngAfterViewInit(): void {
		if (this.gridContainer && this.config) {
			this.gridService.setContainerWidth(this.config, this.gridContainer.nativeElement.offsetWidth);
			this.setHasOpsGroup();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.refresh && this.config) {
			this.gridService.refreshItems('changes.refresh', this.config);
		}
		if (changes.config) {
			const config: any = changes.config;
			if (config.__initialized) {
				setTimeout(() => {
					this.setHasOpsGroup();
					if (this.config) {
						this.gridService.configChange('changes.config', this.config);
					}
				}, 0);
			}
		}
	}

	public setContainerWidth() {
		if (this.config && this.gridContainer) {
			setTimeout(() => {
				this.setHasOpsGroup();
				if (this.config && this.gridContainer) {
					this.gridService.setContainerWidth(this.config, this.gridContainer.nativeElement.offsetWidth);
				}
			}, 0);
		}
	}

	public blankAdded(item: GridItem) {
		this.recordAdded.emit(item);
	}

	public itemSelect(item: GridItem) {
		this.itemSelectToggle.emit(item);
	}

	public itemsReordered(items: Array<GridItem>) {
		this.listReordered.emit(items);
	}

	public itemsCheckChange(items: Array<GridItem>) {
		this.checkChanges.emit(items);
	}

	public facetsChanged(facets: Array<GridFacetSpec>) {
		if (this.config) {
			this.config.facetSpecs = facets;
			this.gridService.configChange('grid widget facet', this.config);
		}
	}

	public pagingChange(state: GridPageState) {
		if (this.config) {
			this.config.pageState = state;
			this.gridService.configChange('grid-widget paging', this.config);
		}
	}

	private setHasOpsGroup() {
		setTimeout(() => {
			if (this.config) {
				if (!this.config.__quadrants) {
					this.config.__quadrants = {left: false, top: false, right: false, bottom: false};
				}
				this.config.__quadrants.left = this.setHasOps('left');
				this.config.__quadrants.top = this.setHasOps('top');
				this.config.__quadrants.right = this.setHasOps('right');
				this.config.__quadrants.bottom = this.setHasOps('bottom');
			}
		}, 0);
	}

	private setHasOps(position: GridPositions): boolean {
		let has = false;
		if (this.config) {
			// const width: number = this.config.containerWidth;
			if (this.config.opSpecs) {
				for (const opSpec of this.config.opSpecs) {
					if (opSpec.position === position) {
						has = true;
						break;
					}
				}
			}
			// if (position === 'left' || position === 'right') {
			//     return has && width > 640;
			// }
		}
		return has;
	}
}
