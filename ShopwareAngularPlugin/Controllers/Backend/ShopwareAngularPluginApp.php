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
 * 1. This controller provides CSRF validation.
 * 2. We don't want to be calling Shopware controllers directly from the Angular application,
 * because this could have side effects.
 */
class Shopware_Controllers_Backend_ShopwareAngularPluginApp extends Shopware_Controllers_Backend_Application
{
    /**
     * A simple trait to return JSON responses.
     */
    use ReturnsJson;

    /**
     * Required by the base class, but does not do anything.
     *
     * @var string
     */
    protected $model = Shopwae\Models\Order\Order::class;

    /**
     * All requests from the Angular application must go to this action.
     * So a request for HomeController::index would look like this.
     * /backend/shopware_angular_plugin_app/index/home/index.
     * I know this does not look nice, but you will probably never make a
     * request like this manually because all of this is heavily simplified in
     * the AppService provided in the Angular application.
     * Checkout the AppService here: ShopwareAngularFrontend/src/app/services/app.service.ts
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
     *
     * @return array
     */
    private function getRoute()
    {
        $parts = explode('/', $this->Request()->getRequestUri());
        return ['controller' => $parts[count($parts) - 2], 'action' => $parts[count($parts) - 1]];
    }
}