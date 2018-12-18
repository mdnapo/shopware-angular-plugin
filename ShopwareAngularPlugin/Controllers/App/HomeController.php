<?php

namespace ShopwareAngularPlugin\Controllers\App;


class HomeController extends Controller
{
    public function index(array $data)
    {
        return [
            'success' => true,
            'msg' => 'Hello world!'
        ];
    }
}