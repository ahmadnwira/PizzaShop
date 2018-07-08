<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ItemsControllerTest extends TestCase
{
    const ROUTE="/api/items";

    public function testIndexHttpStatusCode()
    {
        $result = $this->call('GET', self::ROUTE);
        $result->assertStatus(200);
    }

    public function testIndexResponse()
    {
        $this->artisan("db:seed");
        $result = $this->json('GET', self::ROUTE);
        $result
            ->assertStatus(200)
            ->assertJsonStructure([
                [
                    'id',
                    'category_id',
                    'item',
                    'size',
                    'pirce'
                ]
            ]);
    }
}
