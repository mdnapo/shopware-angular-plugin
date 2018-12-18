import {Component, OnInit} from '@angular/core';
import {AppService} from './services/app.service';
import {HomeService} from './services/home.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private appService: AppService, private homeService: HomeService) {
    }

    /**
     * This is the best place to initiate the AppService.
     * Because the index file will be rendered on the server-side
     * we can be certain that the CSRF token will be available.
     */
    ngOnInit(): void {
        this.appService.init();
    }

    onClickMe() {
        this.homeService.getMsg().then(data => {
            console.log(data);
        });
    }
}
