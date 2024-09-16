import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColIconSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-icon',
    templateUrl: './grid-icon.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridIconWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColIconSpec | undefined = undefined;

    constructor(public gridService: GridService) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColIconSpec : undefined;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
