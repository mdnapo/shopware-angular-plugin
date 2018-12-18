<?php

namespace ShopwareAngularPlugin\Controllers\App;

use Symfony\Component\DependencyInjection\ContainerInterface;


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

    public function getResponse($action, array $data)
    {
        if (method_exists($this, $action)) {
            return $this->$action($data);
        }

        return ['success' => false, 'msg' => "Action '$action' could not found."];
    }
}