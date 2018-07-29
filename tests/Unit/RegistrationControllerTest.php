<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegistrationControllerTest extends TestCase
{
    use DatabaseTransactions;
    const BASE_ROUTE = "api/signup";

    public function testStore()
    {
        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', self::BASE_ROUTE,
            [
                "mail" => "email@test.com",
                "name" => "testUser",
                "password" => "secret1234",
                "password_confirmation" => "secret1234"
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "msg" => "success",
            ]);
    }

}
