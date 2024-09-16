import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColDateSpec} from '../../grid.interfaces';
import {DatePipe} from '@angular/common';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-date',
    templateUrl: './grid-date.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridDateWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColDateSpec | undefined = undefined;

    constructor(public gridService: GridService, private datePipe: DatePipe) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColDateSpec : undefined;
        if (!this.spec) {
            this.spec = {format: 'shortDate'};
        }
        try {
            this.value = this.datePipe.transform(this.value, this.spec.format) || '';
        } catch (exception) {
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
