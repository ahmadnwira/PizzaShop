<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('categories/{category}/items', 'CategoriesController@items');

Route::apiResources([
    'items' => 'ItemsController',
    'categories' => 'CategoriesController',
    'pizza' => 'PizzaController'
]);