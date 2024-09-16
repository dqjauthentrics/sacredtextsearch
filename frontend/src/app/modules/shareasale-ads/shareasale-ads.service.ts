import {Injectable} from '@angular/core';
import _ from 'lodash';

@Injectable()
export class ShareasaleAdsService {
    public selectedAdId = '';
    public adSet: Array<string> = ['35681', '35683', '35704'];

    public setAdId() {
        this.selectedAdId = _.sample(this.adSet) || this.adSet[0];
        return this.selectedAdId;
    }
}
