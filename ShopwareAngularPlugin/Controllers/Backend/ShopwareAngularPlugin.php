<?php


use Shopware\Components\CSRFWhitelistAware;


class Shopware_Controllers_Backend_ShopwareAngularPlugin extends Enlight_Controller_Action implements CSRFWhitelistAware
{
    public function getWhitelistedCSRFActions()
    {
        return ['index'];
    }

    // Register template route
    public function preDispatch()
    {
        $this->get('template')->addTemplateDir(__DIR__ . '/../../Resources/views/');
    }

    // Pass CSRF token to the view
    public function postDispatch()
    {
        $csrfToken = $this->container->get('BackendSession')->offsetGet('X-CSRF-Token');
        $this->View()->assign(['csrfToken' => $csrfToken]);
    }

    public function indexAction()
    {
        $this->View()->assign([]);
    }
}