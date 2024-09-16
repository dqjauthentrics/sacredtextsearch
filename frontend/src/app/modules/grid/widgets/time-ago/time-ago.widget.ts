import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridColumnBaseComponent} from '../grid-column-base.component';
import {GridService} from '../../grid.service';
import * as moment from 'moment';

@Component({
    selector: 'grid-time-ago',
    templateUrl: './time-ago.widget.html',
    styleUrls: ['../../grid.scss']
})
export class GridTimeAgoWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.
    public formattedValue = '';

    constructor(public gridService: GridService) {
        super(gridService);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value && this.value.length) {
            const valueAsMoment = moment(this.value);
            if (valueAsMoment.isValid()) {
                this.formattedValue = valueAsMoment.fromNow();
            }
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
