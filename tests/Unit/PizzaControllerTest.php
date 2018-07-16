<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PizzaControllerTest extends TestCase
{
    use DatabaseTransactions;

    const BASE_ROUTE="api/pizza/";

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

    public function testShowResponse()
    {
        $pizza = factory(\App\Pizza::class)->create();

        $result = $this->json('get', self::BASE_ROUTE.$pizza->id);
        $result
        ->assertOk()
        ->assertJsonStructure([
                'id',
                'name',
                'dough',
                'size',
                'price',
                'toppings_count',
                'created_at',
                'updated_at',
        ]);
    }

    public function testDelete()
    {

        $pizza = factory(\App\Pizza::class)->create();

        $result = $this->json('delete', self::BASE_ROUTE.$pizza->id);
        $result->assertStatus(201);
    }

    public function testStore()
    {
        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', self::BASE_ROUTE,
            [
                "name" => "new_pizza",
                "dough" => "regular",
                "toppings_count" => 3,
                "size" => "small",
                "price" => 6
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "created" => true,
            ]);
    }

    public function testUpdate()
    {
        $pizza = factory(\App\Pizza::class)->create();

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('PATCH', self::BASE_ROUTE.$pizza->id,
            [
                'name' => 'updated_pizza',
                'price'=>7
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "updated" => true,
            ]);
    }
}
