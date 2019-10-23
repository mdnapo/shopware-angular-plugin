<?php

namespace ShopwareAngularPlugin\Controllers\App;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ControllerDispatcher
 *
 * The ControllerDispatcher is responsible for routing requests from the Angular app to our custom controllers.
 * When creating an instance of a custom controller this class also injects the Shopware container.
 *
 * @package ShopwareAngularPlugin\Controllers\App
 */
class ControllerDispatcher
{
    protected $container;

    /**
     * We map our custom controllers in this array.
     * Our HomeController is mapped to the 'home' key.
     * So a request to HomeController::index from the backend must go to home/index.
     * Of course home/index must be prefixed with http://example.com/backend/shopware_angular_plugin_app/index/.
     * This logic however can be easily encapsulated.
     *
     * @var array
     */
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