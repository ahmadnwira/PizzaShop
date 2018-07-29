<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class RegistrationController extends Controller
{
   /**
   * Store a newly created user in storage.
   *
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
    public function store(Request $request) {
        $validator = \Validator::make($request->all(), [
            'mail' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()->all()], 422);
        }

        try{
            User::create([
                "email" => $request->mail,
                "name" => $request->name,
                "password" => bcrypt($request->password)
            ]);
        }catch (\ErrorException $e){
            return response()->json("failed", 503);
        }

        return response()->json(["msg"=>"success"], 201);
    }
}
