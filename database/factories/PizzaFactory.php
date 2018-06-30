<?php

use Faker\Generator as Faker;

$factory->define(App\Pizza::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'dough' => rand(0, 1) ? 'regular' : 'sicilian',
        'toppings_count' => rand(0, 5),
        'size' => rand(0, 1) ? 'large' : 'small',
        'pirce' => $faker->randomFloat(2, 6, 30),
    ];
});
