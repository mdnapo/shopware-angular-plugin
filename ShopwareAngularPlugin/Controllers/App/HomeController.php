<?php

namespace ShopwareAngularPlugin\Controllers\App;


class HomeController extends Controller
{
    public function greet(array $data)
    {
        // To access the Shopware DI container simply use $this->container.
        $name = $data['name'];
        return [
            'success' => true,
            'msg' => "Hello $name!"
        ];
    }
}