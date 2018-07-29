<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SessionsControllerTest extends TestCase
{
    use DatabaseTransactions;
    const BASE_ROUTE = "api/login";

    public function testStore()
    {
        $pass = "secret123";
        $user = factory(\App\User::class)->create([
                'password' => bcrypt($pass),
            ]);

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
            'Connection' => 'close'
        ])->json('POST', self::BASE_ROUTE,
            [
                "email" => $user->email,
                "password" => $pass,
            ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                "msg" => "success",
            ])
            ->assertJsonStructure([
                "msg",
                "token",
            ]);
        }
}
