<?php

use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$routes = require __DIR__ . '/../src/routes.php';
if (is_callable($routes)) {
    $routes($app);
} else {
    die('Error al cargar rutas');
}

$app->run();
