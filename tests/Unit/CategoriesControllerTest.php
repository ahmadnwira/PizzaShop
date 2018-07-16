<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoriesControllerTest extends TestCase
{
    const BASE_ROUTE="api/categories";

    public function testIndexHttpStatusCode()
    {
        $result = $this->call('GET', self::BASE_ROUTE);
        $result->assertOk();
    }

    public function testIndexResponse()
    {
        factory(\App\Category::class)->create();

        $result = $this->json('GET', self::BASE_ROUTE);
        $result
            ->assertOk()
            ->assertJsonStructure([
                [
                    'id',
                    'category',
                ]
            ]);
    }

    public function testShowResponse()
    {
        $category = factory(\App\Category::class)->create();

        $result = $this->json('get', self::BASE_ROUTE ."/". $category->id);
        $result
        ->assertOk()
        ->assertJsonStructure([
            'id',
            'category',
            'created_at',
            'updated_at',
        ]);
    }

    public function testItems()
    {
        $category = factory(\App\Category::class)->create();
        factory(\App\Item::class)->create([
            'category_id' => $category->id
        ]);

        $result = $this->json('get', self::BASE_ROUTE ."/". $category->id. "/items");
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

    public function testDelete()
    {
        $category = factory(\App\Category::class)->create();

        $result = $this->json('delete', self::BASE_ROUTE ."/". $category->id);
        $result->assertStatus(201);

        $this->assertTrue(\App\Item::where('category_id', $category->id)->get()->isEmpty());
    }

    public function testStore()
    {
        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', 'api/categories', ['category' => 'new_category']);

        $response
            ->assertStatus(201)
            ->assertJson([
                "created" => true,
            ]);
    }


    public function testUpdate()
    {
        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('PATCH', 'api/categories/1', ['category' => 'updated_category']);

        $response
            ->assertStatus(201)
            ->assertJson([
                "updated" => true,
            ]);
    }


}
