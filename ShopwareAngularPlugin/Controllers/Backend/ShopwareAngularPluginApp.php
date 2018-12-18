<?php

use Shopware\Components\CSRFWhitelistAware;
use ShopwareAngularPlugin\Controllers\App\ControllerDispatcher;
use ShopwareAngularPlugin\Controllers\App\ReturnsJson;


class Shopware_Controllers_Backend_ShopwareAngularPluginApp extends Shopware_Controllers_Backend_Application
{
    use ReturnsJson;

    protected $model = Shopwae\Models\Order\Order::class;

    public function indexAction()
    {
        $route = $this->getRoute();
        $data = $this->Request()->getPost();
        $dispatcher = new ControllerDispatcher($this->container);
        $res = $dispatcher->dispatch($route['controller'], $route['action'], $data);
        $this->returnJson($res);
    }

    private function getRoute()
    {
        $parts = explode('/', $this->Request()->getRequestUri());
        return ['controller' => $parts[count($parts) - 2], 'action' => $parts[count($parts) - 1]];
    }
}