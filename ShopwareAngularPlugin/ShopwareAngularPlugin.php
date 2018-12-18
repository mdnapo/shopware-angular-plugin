<?php

namespace ShopwareAngularPlugin;

use Shopware\Components\Plugin;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * Shopware-Plugin ShopwareAngularPlugin.
 */
class ShopwareAngularPlugin extends Plugin
{
    public function launchModule()
    {
        return __DIR__ . '/Controllers/Backend/ExactLink.php';
    }
}
