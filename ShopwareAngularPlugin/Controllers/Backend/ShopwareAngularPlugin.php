<?php


use Shopware\Components\CSRFWhitelistAware;

/**
 * Class Shopware_Controllers_Backend_ShopwareAngularPlugin
 *
 * This is the entry controller for the backend application.
 * It basically just injects the CSRF token and loads the Angular application.
 */
class Shopware_Controllers_Backend_ShopwareAngularPlugin extends Enlight_Controller_Action implements CSRFWhitelistAware
{
    public function getWhitelistedCSRFActions()
    {
        return ['index'];
    }

    /**
     * Register template route.
     */
    public function preDispatch()
    {
        $this->get('template')->addTemplateDir(__DIR__ . '/../../Resources/views/');
    }

    /**
     * Pass CSRF token to the view.
     */
    public function postDispatch()
    {
        $csrfToken = $this->container->get('BackendSession')->offsetGet('X-CSRF-Token');
        $this->View()->assign(['csrfToken' => $csrfToken]);
    }

    /**
     * The index is simply here to load the Angular application.
     */
    public function indexAction()
    {
        $this->View()->assign([]);
    }
}