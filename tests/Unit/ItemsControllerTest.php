<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use JWTAuth;

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
        $adminUser = factory(\App\User::class)->create(['is_admin'=>true]);
        $token=JWTAuth::fromUser($adminUser);

        $category = factory(\App\Category::class)->create();

        $item = factory(\App\Item::class)->create([
            'category_id' => $category->id
        ]);

        $result = $this->json('delete', self::BASE_ROUTE.$item->id, [
            'token' => $token
        ]);
        $result->assertStatus(201);
    }

    public function testStore()
    {
        $adminUser = factory(\App\User::class)->create(['is_admin'=>true]);
        $token=JWTAuth::fromUser($adminUser);

        $category = factory(\App\Category::class)->create();

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', self::BASE_ROUTE,
            [
                'name' => 'new_item',
                'category' => $category->id,
                'size' => 'small',
                'price' => 6.22,
                'token' => $token
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "created" => true,
            ]);
    }

    public function testUpdate()
    {
        $adminUser = factory(\App\User::class)->create(['is_admin'=>true]);
        $token=JWTAuth::fromUser($adminUser);

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
                'price'=>7,
                'token' => $token
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "updated" => true,
        ]);
    }
}
