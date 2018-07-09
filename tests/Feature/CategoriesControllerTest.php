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
        $this->artisan("db:seed");
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
        $result = $this->json('get', self::BASE_ROUTE . "/1");
        $result
        ->assertOk()
        ->assertJsonCount(4);
    }
}
