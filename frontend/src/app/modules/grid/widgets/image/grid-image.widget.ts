import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColImageSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';
import {GridLinkService} from '../../grid-link.service';

@Component({
    selector: 'grid-image',
    templateUrl: './grid-image.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridImageWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColImageSpec | undefined = undefined;
    public src: string | number | null = null;

    constructor(public gridService: GridService, private gridLinkService: GridLinkService) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColImageSpec : undefined;
        if (this.value && this.item) {
            this.src = this.gridLinkService.parse(this.item, this.value);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
