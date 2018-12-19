import {Component, OnInit} from '@angular/core';
import {AppService} from './services/app.service';
import {HomeService} from './services/home.service';
import {OrderService} from './services/order.service';

export interface OrderInterface {
    id: number;
    number: number;
    status: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    input_name: string | null = null;
    msg: string | null = null;
    orders: OrderInterface[] = [];

    constructor(private appService: AppService,
                private homeService: HomeService,
                private orderService: OrderService) {
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
        this.homeService.getMsg({name: this.input_name})
            .then((data: any) => {
                if (data.success) {
                    this.msg = data.msg;
                } else {
                    console.log(data);
                }
            });
        this.orderService.getAll()
            .then((data: any) => {
                if (data.success) {
                    this.orders = data.orders;
                } else {
                    console.log(data);
                }
            });
    }
}
