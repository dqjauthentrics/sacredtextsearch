import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SysinfoService} from '@services/sysinfo.service';
import {CollectionTreeService} from '@services/collection-tree.service';
import {FilterSelectionService} from '@services/filter-selection.service';
import {CollectionService} from '@services/collection.service';
import {SearchService} from '@services/search.service';
import {ReligionInterface} from '@backend/religion.interface';
import {TreeviewItem} from '@modules/treeview/models/treeview-item';
import {FilterSelectionInterface} from '@shared/interfaces/filter-selection.interface';

@Component({
	selector: 'filter-collection',
	templateUrl: 'filter-collection.component.html',
	styleUrls: ['filter-collection.scss'],
})
export class FilterCollectionComponent implements OnInit {
	@Output() hide = new EventEmitter<void>();
	public loading = true;
	public SVC: CollectionTreeService;

	public config: any = { //TreeviewConfig = {
		hasAllCheckBox: true,
		hasFilter: false,
		hasCollapseExpand: true,
		decoupleChildFromParent: false,
		hasDivider: false,
		maxHeight: 2500,
	};

	constructor(public collectionTreeService: CollectionTreeService,
				public collectionService: CollectionService,
				private sysinfoService: SysinfoService,
				private searchService: SearchService,
				private filterSelectionService: FilterSelectionService) {
		this.SVC = collectionTreeService;
	}

	ngOnInit(): void {
		this.initialize();
	}

	public changeNotify() {
		this.searchService.collectionChange.next(this.collectionTreeService.collectionTreeView);
	}

	public hideMe() {
		this.hide.emit();
	}

	private initialize() {
		this.sysinfoService.getLastUpdate().then(() => {
			this.collectionService.getCollection()
				.then((collection: ReligionInterface[]) => {
					this.filterSelectionService.initialize(collection)
						.then((selections: Array<FilterSelectionInterface>) => {
							this.collectionTreeService
								.build(collection, selections)
								.then((_treeView: TreeviewItem[]) => {
									this.loading = false;
								});
						});
				});
		});
	}
}
