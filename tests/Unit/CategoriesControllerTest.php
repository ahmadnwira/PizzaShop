<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use JWTAuth;
use App\User;

class CategoriesControllerTest extends TestCase
{
    use DatabaseTransactions;

    const BASE_ROUTE="api/categories/";

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

        $result = $this->json('get', self::BASE_ROUTE.$category->id);
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

        $result = $this->json('get', self::BASE_ROUTE.$category->id."/items");
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
        $adminUser = factory(\App\User::class)->create(['is_admin'=>true]);
        $token=JWTAuth::fromUser($adminUser);

        $category = factory(\App\Category::class)->create();

        $result = $this->json('delete', self::BASE_ROUTE.$category->id,[
            "token"=> $token
        ]);
        $result->assertStatus(201);

        $this->assertTrue(\App\Item::where('category_id', $category->id)->get()->isEmpty());
    }

    public function testStore()
    {
        $adminUser = factory(\App\User::class)->create(['is_admin'=>true]);
        $token=JWTAuth::fromUser($adminUser);

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', self::BASE_ROUTE,[
                'category' => 'new_category',
                "token" => $token
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "created" => true
            ]);
    }

    public function testUpdate()
    {
        $adminUser = factory(\App\User::class)->create(['is_admin'=>true]);
        $token=JWTAuth::fromUser($adminUser);

        $category = factory(\App\Category::class)->create();

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('PATCH', self::BASE_ROUTE.$category->id,
            [
                'category' => 'updated_category',
                "token" => $token
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "updated" => true,
            ]);
    }


}
