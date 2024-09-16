import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import {RouterModule} from '@angular/router';
import {GridWidget} from './grid.widget';
import {GridFacetsWidget} from './facets/grid-facets.widget';
import {GridTableWidget} from './table/grid-table.widget';
import {GridTilesWidget} from './tiles/grid-tiles.widget';
import {GridPaginatorWidget} from './paginator/grid-paginator.widget';
import {GridSearchBarWidget} from './search-bar/grid-search-bar.widget';
import {GridTileDefaultWidget} from './tiles/grid-tile-default.widget';
import {GridColumnWidget} from './widgets/column/grid-column.widget';
import {GridFacetWidget} from './facets/grid-facet.widget';
import {GridTextWidget} from './widgets/text/grid-text.widget';
import {GridImageWidget} from './widgets/image/grid-image.widget';
import {GridDateWidget} from './widgets/date/grid-date.widget';
import {GridService} from './grid.service';
import {GridOpsWidget} from './ops/grid-ops.widget';
import {GridDebugWidget} from './debug/grid-debug.widget';
import {GridActionsWidget} from './widgets/actions/grid-actions.widget';
import {GridButtonWidget} from './widgets/button/grid-button.widget';
import {GridListWidget} from './widgets/list/grid-list.widget';
import {GridAvatarWidget} from './widgets/avatar/grid-avatar.widget';
import {GridLoadingBarWidget} from './loading/grid-loading-bar.widget';
import {GridIconWidget} from './widgets/icon/grid-icon.widget';
import {GridEmailWidget} from './widgets/email/grid-email.widget';
import {GridCheckWidget} from './widgets/check/grid-check.widget';
import {GridConfirmationButtonWidget} from './widgets/button/grid-confirmation-button.widget';
import {GridColValueWidget} from './widgets/column/grid-col-value.widget';
import {GridBlankWidget} from './blank/grid-blank.widget';
import {GridLinkService} from './grid-link.service';
import {GridLookupWidget} from './widgets/lookup/grid-lookup.widget';
import {GridInlineEditWidget} from './widgets/inline-edit/grid-inline-edit.widget';
import {GridColumnBaseComponent} from './widgets/grid-column-base.component';
import {GridTimeAgoWidget} from './widgets/time-ago/time-ago.widget';
import {GridRequiredFieldWidget} from './widgets/required-field/required-field.widget';
import {GridDataService} from './grid-data.service';
import {GridCustomValueWidget} from './widgets/custom/grid-custom-value.widget';
import {GridGaugeWidget} from './widgets/gauge/grid-gauge.widget';
import {NgxGaugeModule} from 'ngx-gauge';
import {TomeIconComponent} from '../shared/grid-columns/tome-icon/tome-icon.component';
import {VerseBodyCellComponent} from '../shared/grid-columns/verse-body-cell/verse-body-cell.component';
import {SharedModule} from '../shared/shared.module';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {ModalModule} from 'ngx-bootstrap/modal';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
	declarations: [
		GridActionsWidget,
		GridAvatarWidget,
		GridBlankWidget,
		GridButtonWidget,
		GridCheckWidget,
		GridColumnBaseComponent,
		GridColumnWidget,
		GridColValueWidget,
		GridConfirmationButtonWidget,
		GridDateWidget,
		GridDebugWidget,
		GridEmailWidget,
		GridFacetsWidget,
		GridFacetWidget,
		GridIconWidget,
		GridImageWidget,
		GridListWidget,
		GridLoadingBarWidget,
		GridLookupWidget,
		GridOpsWidget,
		GridPaginatorWidget,
		GridRequiredFieldWidget,
		GridSearchBarWidget,
		GridTableWidget,
		GridTextWidget,
		GridTileDefaultWidget,
		GridTilesWidget,
		GridWidget,
		GridInlineEditWidget,
		GridTimeAgoWidget,
		GridCustomValueWidget,
		GridGaugeWidget,
	],
	exports: [
		GridWidget,
	],
	imports: [
		BsDatepickerModule,
		CommonModule,
		DragulaModule,
		FormsModule,
		ModalModule,
		NgxGaugeModule,
		PopoverModule,
		ReactiveFormsModule,
		RouterModule,
		SharedModule,
		TabsModule,
		TooltipModule,
		TranslateModule,
	],
	providers: [
		BsModalService,
		BsDatepickerConfig,
		BsLocaleService,
		DragulaService,
		GridDataService,
		GridLinkService,
		GridService,
	]
})
export class GridModule {
}
