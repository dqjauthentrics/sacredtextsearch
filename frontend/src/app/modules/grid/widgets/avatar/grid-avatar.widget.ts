import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColAvatarSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-avatar',
    templateUrl: './grid-avatar.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridAvatarWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColAvatarSpec | undefined = undefined;
    public src: string | number | null = null;
    public name: string | null = null;

    constructor(public gridService: GridService) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColAvatarSpec : undefined;
        this.src = this.value ? this.value.toString() : null;
        if (this.spec) {
            if (this.spec.firstNameCol && this.item) {
                this.name = this.gridService.getColNameValue(this.spec.firstNameCol, this.item) || '';
            }
            if (this.spec.lastNameCol && this.item) {
                if (!this.name) {
                    this.name = '';
                }
                if (this.name.length > 0) {
                    this.name += ' ';
                }
                this.name += this.gridService.getColNameValue(this.spec.lastNameCol, this.item) || '';
            }
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
