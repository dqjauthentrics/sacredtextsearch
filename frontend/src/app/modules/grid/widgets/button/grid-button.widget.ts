import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridButtonSpec, GridConfig, GridItem} from '../../grid.interfaces';
import {Router} from '@angular/router';
import {GridLinkService} from '../../grid-link.service';

@Component({
	selector: 'grid-button',
	templateUrl: './grid-button.widget.html',
	styleUrls: ['../../grid.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridButtonWidget {
	@Input() config?: GridConfig;
	@Input() item?: GridItem;
	@Input() button?: GridButtonSpec;

	public visible = true;

	constructor(private router: Router, private gridService: GridService, private gridLinkService: GridLinkService) {
	}

	public actionClick(button: GridButtonSpec, event: MouseEvent | KeyboardEvent | PointerEvent) {
		event.stopPropagation();
		if (this.button && this.config) {
			if (this.button.action && this.item) {
				if (this.button.action === 'remove' || this.button.action === 'unremove') {
					this.gridService.itemEvent.next({listId: this.config.uniqueId, item: this.item, eventType: this.button.action});
				} else if (this.item) {
					this.button.action(this.item);
				}
			} else if (this.button.url && this.item) {
				const url = this.gridLinkService.parse(this.item, this.button.url);
				this.router.navigate([url]).then(/* do nothing */);
			}
		}
	}

	public isVisible() {
		if (this.button) {
			if (this.button.visibleCheck) {
				if (this.button.visibleCheck === true) {
					return true;
				} else if (this.item) {
					this.visible = this.button.visibleCheck(this.item);
				}
			}
		}
		return this.visible;
	}
}
