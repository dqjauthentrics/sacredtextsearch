import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColCheckSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-check',
    templateUrl: './grid-check.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridCheckWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColCheckSpec | undefined = undefined;
    public checkClasses = '';

    constructor(public gridService: GridService) {
        super(gridService);
    }

    public setClasses() {
        const checked = (this.value && [1, '1', 'T', 'Y', 'y', 'true', 'True', 'TRUE', true].indexOf(this.value) >= 0);
        if (checked) {
            if (this.spec && this.spec.checkedClasses) {
                this.checkClasses = this.spec.checkedClasses;
            } else {
                this.checkClasses = 'lightgray fal fa-check-square fa-2x';
            }
        } else {
            if (this.spec && this.spec.uncheckedClasses) {
                this.checkClasses = this.spec.uncheckedClasses;
            } else {
                this.checkClasses = 'lightgray fal fa-square fa-2x';
            }
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColCheckSpec : undefined;
        this.setClasses();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
