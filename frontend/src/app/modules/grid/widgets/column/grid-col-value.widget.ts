import {Component, Input} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColSpec, GridConfig, GridItem} from '../../grid.interfaces';

@Component({
	selector: 'grid-col-value',
	templateUrl: './grid-col-value.widget.html',
})
export class GridColValueWidget {
	@Input() item?: GridItem;
	@Input() config?: GridConfig;
	@Input() colSpec: GridColSpec | undefined;

	constructor(public gridService: GridService) {
	}
}
