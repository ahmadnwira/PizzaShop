<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PizzaControllerTest extends TestCase
{
    use DatabaseTransactions;

    const BASE_ROUTE="/api/pizza";

    public function testIndexHttpStatusCode()
    {
        $result = $this->call('GET', self::BASE_ROUTE);
        $result->assertOk();
    }

    public function testIndexResponse()
    {
        $category = factory(\App\Category::class)->create();
        factory(\App\Pizza::class)->create();

        $result = $this->json('GET', self::BASE_ROUTE);
        $result
            ->assertOk()
            ->assertJsonStructure([
                [
                    'id',
                    'dough',
                    'toppings_count',
                    'name',
                    'size',
                    'price'
                ]
            ]);
    }

}
