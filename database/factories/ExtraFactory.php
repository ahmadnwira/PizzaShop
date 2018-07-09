<?php

use Faker\Generator as Faker;

$factory->define(App\Extra::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'size' => rand(0, 1) ? 'large' : 'small',
        'price' => $faker->randomFloat(2, 1, 5),
    ];
});
