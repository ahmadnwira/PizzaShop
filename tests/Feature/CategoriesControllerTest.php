<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoriesControllerTest extends TestCase
{
    const BASE_ROUTE="/api/categoires";

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
                'item',
                'size',
                'price'
            ]
        ]);
    }
}
