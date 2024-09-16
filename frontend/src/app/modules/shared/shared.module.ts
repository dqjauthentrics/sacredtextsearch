import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {SearchScoreComponent} from './grid-columns/search-score/search-score.component';
import {TomeIconComponent} from './grid-columns/tome-icon/tome-icon.component';
import {SourceComponent} from './source/source.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ContactComponent} from './contact/contact.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {VerseBodyCellComponent} from './grid-columns/verse-body-cell/verse-body-cell.component';
import {TranslateModule} from '@ngx-translate/core';
import {PaypalDonationWidget} from './paypal/paypal-donation.widget';
import {VerseTranslationsPanelComponent} from './verse-translations-panel/verse-translations-panel.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {TreeviewModule} from '../treeview/treeview.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		DataTablesModule,
		NgxGaugeModule,
		TooltipModule,
		TreeviewModule,
		TranslateModule,
	],
	declarations: [
		ContactComponent,
		PaypalDonationWidget,
		SearchScoreComponent,
		SourceComponent,
		TomeIconComponent,
		WelcomeComponent,
		VerseBodyCellComponent,
		VerseTranslationsPanelComponent,
	],
	exports: [
		ContactComponent,
		PaypalDonationWidget,
		SearchScoreComponent,
		SourceComponent,
		TomeIconComponent,
		WelcomeComponent,
		VerseBodyCellComponent,
		VerseTranslationsPanelComponent,
	]
})
export class SharedModule {
}
