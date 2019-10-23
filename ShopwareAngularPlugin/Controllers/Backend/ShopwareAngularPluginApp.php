<?php

use Shopware\Components\CSRFWhitelistAware;
use ShopwareAngularPlugin\Controllers\App\ControllerDispatcher;
use ShopwareAngularPlugin\Controllers\App\ReturnsJson;

/**
 * Class Shopware_Controllers_Backend_ShopwareAngularPluginApp
 *
 * This controller acts as a front controller that intercepts all requests from the Angular application and passes
 * them to the controller dispatcher.
 *
 * This is done for two reasons.
 * 1. This controller provides CSRF validation for all incoming calls.
 * 2. Shopware controllers can add and enforce unnecessary logic.
 * 3. All requests are forced to pass data through post requests which enforces security.
 *
 * Using this mechanism allows us to define custom controllers which are not necessarily bound to Shopware conventions.
 */
class Shopware_Controllers_Backend_ShopwareAngularPluginApp extends Shopware_Controllers_Backend_Application
{
    /**
     * A simple trait to return JSON responses.
     */
    use ReturnsJson;

    /**
     * Required by the base class, but does not do anything.
     * This is an example of unnecessary logic that this front controller protects us from having to implement
     * over and over.
     */
    protected $model = Shopwae\Models\Order\Order::class;

    /**
     * All requests from the Angular application must go to this action.
     * So a request for HomeController::index would look like this.
     * /backend/shopware_angular_plugin_app/index/home/index.
     * I know this does not look nice, but you will probably never make a
     * request like this manually because all of this is heavily simplified in
     * the AppService provided in the Angular application.
     * Checkout the AppService here: frontend/src/app/services/app.service.ts
     */
    public function indexAction()
    {
        $route = $this->getRoute();
        $data = $this->Request()->getPost();
        $dispatcher = new ControllerDispatcher($this->container);
        $res = $dispatcher->dispatch($route['controller'], $route['action'], $data);
        $this->returnJson($res);
    }

    /**
     * This function extracts the controller and action from a request.
     * All requests will be routed to http://example.com/backend/{PluginName}/.
     * We want to follow the simple "controller/action" convention for our Angular app request routes.
     * To achieve this the Angular app appends its routes to example url above.
     * Since we know the "controller/action" part will always be at the end of the route,
     * we can simply explode the request url and take the last to values.
     *
     * @return array
     */
    private function getRoute()
    {
        $parts = explode('/', $this->Request()->getRequestUri());
        return ['controller' => $parts[count($parts) - 2], 'action' => $parts[count($parts) - 1]];
    }
}