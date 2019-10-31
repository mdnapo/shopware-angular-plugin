import {Component, OnInit} from '@angular/core';
import {AppService} from './services/app.service';
import {HomeService} from './services/home.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    name: string = '';
    msg: string = '';

    constructor(private appService: AppService,
                private homeService: HomeService) {
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
        this.homeService.greet({name: this.name})
            .then((data: any) => {
                if (data.success) {
                    this.msg = data.msg;
                } else {
                    console.log(data);
                }
            });
    }
}
