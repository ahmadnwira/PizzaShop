<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use JWTAuth;

class SessionsController extends Controller
{
    /**
   * Store a newly created session.
   *
   * @param  \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
        $validator = \Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["errors"=>$validator->errors()->all()], 422);
        }

        $credentials = $request->only('email', 'password');

        try{
            if(! $token = JWTAuth::attempt($credentials)){
                // errors => array so it on the front-end side the errorList can iterate over it.
                return response()->json(["errors"=>["Invalid Credentials!", ]], 422);
            }
        } catch (JWTException $e){
            return response()->json("failed", 503);
        }

        return response()->json(["msg"=>"success", "token"=>$token], 201);
    }

    public function isAdmin(Request $request) {
        try {
            $user = \JWTAuth::parseToken()->toUser();
        }
        catch(TokenExpiredException $e) {
            return response()->json(["msg" => "expired"], 403);
        }

        if(!$user->is_admin){
            return response()->json(["msg" => false], 200);
        }
        return response()->json(["msg" => true], 200);
    }

}
