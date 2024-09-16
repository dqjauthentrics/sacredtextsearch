import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColListSpec, GridItem} from '../../grid.interfaces';
import {GridLinkService} from '../../grid-link.service';
import {GridColumnBaseComponent} from '../grid-column-base.component';

@Component({
    selector: 'grid-list',
    templateUrl: './grid-list.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridListWidget extends GridColumnBaseComponent implements OnInit, OnDestroy {
    // N.B. Inputs and Outputs are inherited.

    public spec: GridColListSpec | undefined = undefined;

    constructor(public gridService: GridService, private gridLinkService: GridLinkService) {
        super(gridService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColListSpec : undefined;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public getLink(listItem: any): string | null {
        let link: string | null = null;
        if (this.spec && this.spec.linkSpec && this.item) {
            link = this.gridLinkService.parse(this.item, this.spec.linkSpec.path);
            if (link && this.spec.listColPathSuffix) {
                const asGridItem = {record: listItem} as GridItem;
                const linkSuffix = this.gridLinkService.parse(asGridItem, this.spec.listColPathSuffix);
                if (linkSuffix) {
                    link += linkSuffix;
                }
            }
        }
        return link;
    }
}
