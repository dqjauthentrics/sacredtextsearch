import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchScoreComponent} from './grid-columns/search-score/search-score.component';
import {TomeIconComponent} from './grid-columns/tome-icon/tome-icon.component';
import {VerseSourceComponent} from './source/verse-source.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ContactComponent} from './contact/contact.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {VerseBodyCellComponent} from './grid-columns/verse-body-cell/verse-body-cell.component';
import {TranslateModule} from '@ngx-translate/core';
import {PaypalDonationWidget} from './paypal/paypal-donation.widget';
import {VerseTranslationsPanelComponent} from './verse-translations-panel/verse-translations-panel.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {TreeviewModule} from '../treeview/treeview.module';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {CloserWidget} from '@modules/shared/closer/closer.widget';
import {ModalHeaderWidget} from '@modules/shared/modal-header/modal-header.widget';

@NgModule({
	declarations: [
		ContactComponent,
		PaypalDonationWidget,
		SearchScoreComponent,
		VerseSourceComponent,
		TomeIconComponent,
		WelcomeComponent,
		CloserWidget,
		ModalHeaderWidget,
		VerseBodyCellComponent,
		VerseTranslationsPanelComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxGaugeModule,
		TooltipModule,
		TreeviewModule,
		TranslateModule,
		PopoverModule,
	],
	exports: [
		ContactComponent,
		PaypalDonationWidget,
		SearchScoreComponent,
		VerseSourceComponent,
		TomeIconComponent,
		WelcomeComponent,
		CloserWidget,
		ModalHeaderWidget,
		VerseBodyCellComponent,
		VerseTranslationsPanelComponent,
	]
})
export class SharedModule {
}
