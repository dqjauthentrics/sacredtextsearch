import {Component} from '@angular/core';
import {SearchService} from './services/search.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(public searchService: SearchService) {
        this.initializeApp();
    }

    private initializeApp() {
        // this.platform.ready().then(() => {
        //     this.statusBar.styleDefault();
        // });
    }
}
