import {NgModule} from '@angular/core';
import {WordCloudDirective} from './word-cloud.directive';
import {WordCloudCardComponent} from './word-cloud-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
	imports: [
		TranslateModule.forChild(),
		CommonModule
	],
	declarations: [
		WordCloudDirective,
		WordCloudCardComponent
	],
	exports: [
		WordCloudDirective,
		WordCloudCardComponent
	],
	providers: [
		WordCloudDirective
	]
})
export class WordCloudModule {
}
