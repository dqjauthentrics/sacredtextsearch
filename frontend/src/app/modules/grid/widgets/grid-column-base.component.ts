import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../grid.service';
import {GridColSpec, GridConfig, GridItem, GridItemEvent} from '../grid.interfaces';
import {Subscription} from 'rxjs';

@Component({
	template: ``,
	styleUrls: ['../grid.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridColumnBaseComponent implements OnInit, OnDestroy {
	@Input() item?: GridItem;
	@Input() config?: GridConfig;
	@Input() colSpec?: GridColSpec;

	public value: any = '';
	private eventSub?: Subscription;

	constructor(public gridService: GridService) {
	}

	public inlineChange(value: number | string) {
		if (this.config && this.colSpec && this.item) {
			this.value = this.gridService.inlineChangeNotice(this.config, this.colSpec, this.item, value);
		}
	}

	ngOnInit(): void {
		if (this.item && this.colSpec && this.colSpec) {
			this.value = this.gridService.getItemValue(this.colSpec, this.item);
			this.eventSub =
				this.gridService
					.itemEvent
					.subscribe((_event: GridItemEvent) => {
						if (this.item && this.colSpec && this.colSpec) {
							this.value = this.gridService.getItemValue(this.colSpec, this.item);
						}
					});
		}
	}

	ngOnDestroy(): void {
		if (this.eventSub) {
			this.eventSub.unsubscribe();
		}
	}
}
