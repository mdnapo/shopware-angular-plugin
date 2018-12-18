import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * This class simplifies communication between the Angular application and the backend
 * by taking care of handling the base path for all requests and adding the CSRF token.
 * Now you can make your life easy by encapsulating requests in specific services that
 * use this service, because DI is free in Angular! :D
 */
@Injectable()
export class AppService {
    private apiHost: string = environment.api_host;
    private frontControllerRoute = 'shopware_angular_plugin_app/index/';
    private __csrfToken: any;

    constructor(private http: HttpClient) {

    }

    /**
     * Called in AppComponent.ngOnInit()
     */
    init() {
        const csrfToken: any = document.getElementById('__csrfToken');
        this.__csrfToken = csrfToken.value;
    }

    /**
     * A simple wrapper function for posting requests.
     *
     * @param {string} url
     * @param {Object} body
     * @returns {Promise<Object>}
     */
    post(url: string, body: object = null) {
        url = this.frontControllerRoute + url;
        const _body = body ? body : {};
        _body['__csrf_token'] = this.__csrfToken;
        return this.http.post(this.apiHost + url, _body).toPromise();
    }
}
