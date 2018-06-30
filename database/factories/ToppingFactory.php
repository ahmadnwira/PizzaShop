<?php

use Faker\Generator as Faker;

$factory->define(App\Topping::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
    ];
});
