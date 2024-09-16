/**
 * Angular.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
/**
 * Third Party.
 */
import {MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
/**
 * App.
 */
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SearchService} from '@services/search.service';
import {FilterCollectionComponent} from './modules/shared/filter-collection/filter-collection.component';
import {CollectionService} from '@services/collection.service';
import {SysinfoService} from '@services/sysinfo.service';
import {FormsModule} from '@angular/forms';
import {CollectionTreeService} from '@services/collection-tree.service';
import {FilterSelectionService} from '@services/filter-selection.service';
import {EmailService} from '@services/email.service';
import {AdService} from '@services/ad.service';
import {ChapterPanelComponent} from './modules/shared/chapter-panel/chapter-panel.component';
import {SharedModule} from './modules/shared/shared.module';
import {SearchPage} from './pages/search/search.page';
import {AppDataService} from '@services/app-data.service';
import {WordCloudModule} from './modules/word-cloud/word-cloud.module';
import {WordCloudDirective} from './modules/word-cloud/word-cloud.directive';
import {AdBlockCheckModule} from './modules/ad-block-check/ad-block-check.module';
import {GridModule} from './modules/grid/grid.module';
import {AdLinksModule} from './modules/ad-links/ad-links.module';
import {ShareasaleAdsModule} from './modules/shareasale-ads/shareasale-ads.module';
import {provideNgVibeToastify} from '@ng-vibe/toastify';
import {TreeviewModule} from './modules/treeview/treeview.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GrowlService} from '@services/growl.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
	handle(params: MissingTranslationHandlerParams) {
		return params.key;
	}
}

@NgModule({
	declarations: [
		AppComponent,
		FilterCollectionComponent,
		ChapterPanelComponent,
		SearchPage,
	],
	imports: [
		AdBlockCheckModule,
		AdLinksModule,
		BrowserAnimationsModule,
		BsDatepickerModule.forRoot(),
		TooltipModule.forRoot(),
		HttpClientModule,
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		PopoverModule.forRoot(),
		ShareasaleAdsModule,
		SharedModule,
		WordCloudModule,
		TranslateModule.forRoot({
			loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
			missingTranslationHandler: {provide: MissingTranslationHandler, useClass: AppMissingTranslationHandler},
		}),
		TreeviewModule.forRoot(),
		GridModule,
	],
	providers: [
		AppDataService,
		AdService,
		BsDatepickerConfig,
		BsModalService,
		CollectionService,
		CollectionTreeService,
		EmailService,
		FilterSelectionService,
		GrowlService,
		SysinfoService,
		WordCloudDirective,
		SearchService,
		provideNgVibeToastify()
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
