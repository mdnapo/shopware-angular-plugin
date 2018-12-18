import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class AppService {
    private apiHost: string = environment.api_host;
    private frontControllerRoute = 'shopware_angular_plugin_app/index/';
    private __csrfToken: any;

    constructor(private http: HttpClient) {

    }

    init() {
        const csrfToken: any = document.getElementById('__csrfToken');
        this.__csrfToken = csrfToken.value;
    }

    post(url: string, body: object = null) {
        url = this.frontControllerRoute + url;
        const _body = body ? body : {};
        _body['__csrf_token'] = this.__csrfToken;
        return this.http.post(this.apiHost + url, _body).toPromise();
    }
}
