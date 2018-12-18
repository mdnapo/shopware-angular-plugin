<?php

namespace ShopwareAngularPlugin\Controllers\App;

use Symfony\Component\DependencyInjection\ContainerInterface;


class ControllerDispatcher
{
    protected $container;
    protected $controllers;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->controllers = [];
        $this->controllers['home'] = HomeController::class;
    }

    public function dispatch($controller, $action, $data)
    {
        if (array_key_exists($controller, $this->controllers)) {
            /** @var Controller $controller_instance */
            $controller_instance = new $this->controllers[$controller]($this->container);
            return $controller_instance->getResponse($action, $data);
        }

        return ['success' => false, 'msg' => "Controller '$controller' could not be found."];
    }
}