import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * This class simplifies communication between the Angular application and the backend
 * by taking care of handling the base path for all requests and adding the CSRF token.
 * Just inject this service and delegate backend requests to the post function.
 * Gotta love free Dependency Inject! :D
 *
 * The following format will be referred to in the comments.
 *                          ||
 *                          \/
 * http://example.com/backend/{snake_cased_controller_name}/{snake_cased_action_name}.
 */
@Injectable()
export class AppService {
    private apiHost: string = environment.api_host;
    //Backend requests to plugin controller are done using url of format mentioned above.
    //Since our front controller is named Shopware_Controllers_Backend_ShopwareAngularPluginApp and all requests are
    //handled through the index method every request from the Angular app is sent the url below.
    private frontControllerRoute = 'shopware_angular_plugin_app/index';
    private __csrfToken: any;

    constructor(private http: HttpClient) {
    }

    /**
     * Called in AppComponent.ngOnInit()
     */
    init() {
        // Extract the inject CSRF token so we can pass it when calling the post function.
        const csrfToken: any = document.getElementById('__csrfToken');
        this.__csrfToken = csrfToken.value;
    }

    /**
     * A simple wrapper function for posting requests to the backend.
     *
     * @param {string} url
     * @param {Object} body
     * @returns {Promise<Object>}
     */
    post(url: string, body: any = null) {
        url = this.frontControllerRoute + url;
        const _body = body ? body : {};
        _body.__csrf_token = this.__csrfToken;
        return this.http.post(this.apiHost + url, _body).toPromise();
    }
}
