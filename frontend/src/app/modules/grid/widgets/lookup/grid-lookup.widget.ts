import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColLookupSpec, GridColSpec, GridConfig, GridItem} from '../../grid.interfaces';
import {GridLinkService} from '../../grid-link.service';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-lookup',
    templateUrl: './grid-lookup.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridLookupWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColLookupSpec | undefined = undefined;
    public displayColName = 'name';
    public valueColName = 'id';
    public displayValue = '';
    public selectedValue: number | string | undefined;

    constructor(public gridService: GridService, private gridLinkService: GridLinkService) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColLookupSpec : undefined;
        if (this.spec && this.spec.valueColName) {
            this.valueColName = this.spec.valueColName;
        }
        if (this.spec && this.spec.displayColName) {
            this.displayColName = this.spec.displayColName;
        }
        this.setValues();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public valueChange(config: GridConfig, colSpec: GridColSpec, item: GridItem) {
        this.value = this.gridService.inlineChangeNotice(config, colSpec, item, this.selectedValue);
        this.setValues();
    }

    private setValues(): void {
        try {
            if (this.spec && this.spec.items) {
                for (const item of this.spec.items) {
                    if (item[this.valueColName] === this.value || item[this.valueColName].toString() === this.value.toString()) {
                        this.displayValue = item[this.displayColName];
                        this.selectedValue = item[this.valueColName];
                        return;
                    }
                }
            }
        } catch (exception) {
            console.warn('grid lookup initialization error');
        }
        return;
    }
}
