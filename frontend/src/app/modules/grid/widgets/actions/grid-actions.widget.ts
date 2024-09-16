import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridActionsSpec, GridButtonSpec, GridConfig, GridItem} from '../../grid.interfaces';

@Component({
    selector: 'grid-actions',
    templateUrl: './grid-actions.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridActionsWidget implements OnInit {
    @Input() item?: GridItem;
    @Input() config?: GridConfig;
    @Output() configChange: EventEmitter<GridConfig> = new EventEmitter<GridConfig>();

    public spec: GridActionsSpec | undefined = undefined;

    public inlineEditBtn: GridButtonSpec = {
        icon: 'fad fa-watch', action: (_item: GridItem) => {
            this.setEditing(true);
        }
    };

    constructor(public gridService: GridService) {
    }

    ngOnInit(): void {
        this.spec = this.config && this.config.actionsSpec ? this.config.actionsSpec : undefined;
    }

    public setEditing(isEditing: boolean): void {
        if (this.config && this.item) {
            this.gridService.setEditing(this.config, this.item, isEditing);
            this.configChange.emit(this.config);
        }
    }
}
