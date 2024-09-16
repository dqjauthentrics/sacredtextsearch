import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColGaugeSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
	selector: 'grid-gauge',
	templateUrl: './grid-gauge.widget.html',
	styleUrls: ['../../grid.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridGaugeWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
	// N.B. Inputs and Outputs are inherited.

	public spec: GridColGaugeSpec | undefined = undefined;

	constructor(
		private cdr: ChangeDetectorRef,
		public gridService: GridService
	) {
		super(gridService);
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColGaugeSpec : undefined;
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
