import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridButtonSpec, GridConfig, GridItem} from '../../grid.interfaces';

@Component({
    selector: 'grid-inline-edit',
    templateUrl: './grid-inline-edit.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridInlineEditWidget {
    @Input() item?: GridItem;
    @Input() config: GridConfig | undefined = undefined;
    @Output() configChange: EventEmitter<GridConfig> = new EventEmitter<GridConfig>();

    public saveBtn: GridButtonSpec = {
        icon: 'fad fa-save', text: 'Save', action: (_item: GridItem) => {
            if (this.config && this.item) {
                this.gridService.inlineSaveNotice(this.config, this.item);
            }
            this.setEditing(false);
        }
    };

    public cancelBtn: GridButtonSpec = {
        icon: 'fad fa-times', text: 'Cancel', action: (_item: GridItem) => {
            if (this.config && this.item) {
                this.gridService.inlineCancelNotice(this.config, this.item);
            }
            this.setEditing(false);
        }
    };

    constructor(public gridService: GridService) {
    }

    public setEditing(isEditing: boolean): void {
        if (this.config && this.item) {
            this.gridService.setEditing(this.config, this.item, isEditing);
            this.configChange.emit(this.config);
        }
    }
}
