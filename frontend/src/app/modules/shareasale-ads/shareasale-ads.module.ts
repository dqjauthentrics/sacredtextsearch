import {NgModule} from '@angular/core';
import {ShareasaleAdsWidget} from './shareasale-ads.widget';
import {CommonModule} from '@angular/common';
import {ShareasaleAdsService} from './shareasale-ads.service';

@NgModule({
    declarations: [ShareasaleAdsWidget],
    exports: [ShareasaleAdsWidget],
    imports: [
        CommonModule
    ],
    providers: [
        ShareasaleAdsService
    ]
})
export class ShareasaleAdsModule {
}
