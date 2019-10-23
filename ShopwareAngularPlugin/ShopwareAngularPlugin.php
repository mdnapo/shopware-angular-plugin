<?php

namespace ShopwareAngularPlugin;

use Shopware\Components\Plugin;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * ShopwareAngularPlugin
 *
 * More info on how Shopware simplified modules work can be found at the following link.
 *
 * https://developers.shopware.com/developers-guide/lightweight-backend-modules/
 */
class ShopwareAngularPlugin extends Plugin
{
    /**
     * @return string
     */
    public function launchModule()
    {
        return __DIR__ . '/Controllers/Backend/ExactLink.php';
    }
}
