<?php

namespace ShopwareAngularPlugin\Controllers\App;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class Controller
 *
 * This base class handles the common logic for our custom controllers.
 *
 * @package ShopwareAngularPlugin\Controllers\App
 */
class Controller
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * This method handles dynamically calling the right action on a controller and passing data.
     *
     * @param $action
     * @param array $data
     * @return array
     */
    public function getResponse($action, array $data)
    {
        if (method_exists($this, $action)) {
            return $this->$action($data);
        }

        return ['success' => false, 'msg' => "Action '$action' could not be found."];
    }
}