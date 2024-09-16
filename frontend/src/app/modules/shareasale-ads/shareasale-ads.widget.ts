import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {ShareasaleAdsService} from './shareasale-ads.service';

declare let shrsl_ShareASale_liveWid_Init: any;

@Component({
    selector: 'shareasale-ads-widget',
    templateUrl: 'shareasale-ads.widget.html',
    styleUrls: ['shareasale-ads.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShareasaleAdsWidget implements OnChanges, AfterViewInit {
    @Input() title = 'Related Items';
    @Input() publisherId  = 0;
    @Input() refresh = false;
    public initialized = false;

    constructor(public shareASalesService: ShareasaleAdsService, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.refresh !== undefined && changes.refresh.previousValue !== undefined) {
            this.setAds();
        }
    }

    ngAfterViewInit(): void {
        this.setAds();
    }

    public destroyAds() {
        try {
            for (const adId of this.shareASalesService.adSet) {
                const elName = 'shrsl_liveWid_wideSkyScraper_' + adId;
                const els = document.getElementsByClassName(elName);
                if (els) {
                    for (let i = 0; i < els.length; i++) {
                        els[i].remove();
                    }
                }
            }
        } catch (exception) {
            console.warn('ad removal error', exception);
        }
    }

    private resetHeight() {
        setTimeout(() => {
            const els = document.getElementsByClassName('wideSkyScraper');
            if (els && els.length > 0) {
                const child: Element | null = els[0].firstElementChild;
                if (child) {
                    child.setAttribute('style', 'height:auto !important; text-align:center;');
                }
            }
        }, 1000);
    }

    private setAds() {
        const id = this.shareASalesService.setAdId();
        this.initialized = true;
        this.changeDetectorRef.detectChanges();
        this.destroyAds();
        shrsl_ShareASale_liveWid_Init(id, this.publisherId, 'shrsl_ShareASale_liveWid_wideSkyScraper_populate');
        this.resetHeight();
    }
}
