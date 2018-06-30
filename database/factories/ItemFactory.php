<?php

use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {
    return [
        'category_id' => rand(1,4),
        'item' => $faker->word(),
        'size' => rand(0, 1) ? 'large' : 'small',
        'pirce' => $faker->randomFloat(2, 6, 30),
    ];
});
