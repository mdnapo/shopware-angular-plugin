import {Injectable} from '@angular/core';
import {AppService} from './app.service';

@Injectable()
export class HomeService {
    constructor(private appService: AppService) {
    }

    greet(body: { name: string }) {
        return this.appService.post('/home/index', body);
    }
}
