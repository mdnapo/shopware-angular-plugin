import {Injectable} from '@angular/core';
import {AppService} from './app.service';

@Injectable()
export class OrderService {

    constructor(private appService: AppService) {
    }

    getAll() {
        return this.appService.post('orders/index');
    }
}
