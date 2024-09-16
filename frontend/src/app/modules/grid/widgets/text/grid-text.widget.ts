import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColTextSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-text',
    templateUrl: './grid-text.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridTextWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColTextSpec | undefined = undefined;
    public initialized = false;

    constructor(public gridService: GridService) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColTextSpec : undefined;
        if (!this.spec) {
            this.spec = {};
        }
        if (this.value && this.spec.linkSpec && this.spec.linkSpec.text) {
            this.value = this.spec.linkSpec.text; // For links with icons or common text.
        }
        this.initialized = true;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
