<?php

use Slim\App;
use GuzzleHttp\Client;

return function (App $app) {

    $app->get('/listaUsuarios', function ($request, $response) {

        $client = new Client([
            'verify' => false,
        ]);

        $page = $request->getQueryParams()['page'] ?? 1;
        $url = "https://reqres.in/api/users?page=$page";

        try {
            $res = $client->request('GET', $url);
            $data = json_decode($res->getBody()->getContents(), true);

            $response->getBody()->write(json_encode($data));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode([
                'error' => $e->getMessage()
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withStatus(500);
        }
    });
};
