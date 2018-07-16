<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ItemsControllerTest extends TestCase
{
    use DatabaseTransactions;

    const BASE_ROUTE = "/api/items/";

    public function testIndexHttpStatusCode()
    {
        $result = $this->call('GET', self::BASE_ROUTE);
        $result->assertOk();
    }

    public function testIndexResponse()
    {
        $category = factory(\App\Category::class)->create();
        factory(\App\Item::class)->create([
            'category_id' => $category->id
        ]);

        $result = $this->json('GET', self::BASE_ROUTE);
        $result
            ->assertOk()
            ->assertJsonStructure([
                [
                    'id',
                    'category_id',
                    'name',
                    'size',
                    'price'
                ]
            ]);
    }

    public function testShowResponse()
    {
        $category = factory(\App\Category::class)->create();
        $item = factory(\App\Item::class)->create([
            'category_id' => $category->id
        ]);

        $result = $this->json('get', self::BASE_ROUTE.$item->id);
        $result
        ->assertOk()
        ->assertJsonStructure([
                'id',
                'category_id',
                'name',
                'size',
                'price',
                'created_at',
                'updated_at',
        ]);
    }

    public function testDelete()
    {
        $category = factory(\App\Category::class)->create();

        $item = factory(\App\Item::class)->create([
            'category_id' => $category->id
        ]);

        $result = $this->json('delete', self::BASE_ROUTE.$item->id);
        $result->assertStatus(201);
    }

    public function testStore()
    {
        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', self::BASE_ROUTE,
            [
                'name' => 'new_item',
                'category' => 1,
                'size' => 'small',
                'price' => 6.22
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "created" => true,
            ]);
    }

    public function testUpdate()
    {
        $category = factory(\App\Category::class)->create();
        $item = factory(\App\Item::class)->create([
            'category_id' => $category->id
        ]);

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('PATCH', self::BASE_ROUTE.$item->id,
            [
                'name' => 'updated_item',
                'price'=>7
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "updated" => true,
            ]);
    }
}
