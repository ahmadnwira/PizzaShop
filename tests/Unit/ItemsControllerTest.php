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
        $result  = $this->call('GET', self::ROUTE);
        $statusCode = $result->getStatusCode();
        $this->assertEquals(200, $statusCode);
    }
}
