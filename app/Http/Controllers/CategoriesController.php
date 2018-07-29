<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use JWTAuth;

class CategoriesController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return Category::get(['id', 'category']);
    }

    /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
    public function create()
    {
        //
    }

    /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
    public function store(Request $request)
    {

        // if(! $user = JWTAuth::parseToken()->authenticate()) {
        //     return response()->json(['msg' => 'not allowed'], 403);
        // }

        // if(!$user->is_admin){
        //     return response()->json(['msg' => 'not allowed'], 403);
        // }

        try{
            Category::create(["category" => $request->category]);
        }catch (\ErrorException $e){
            return response()->json(["created"=>false], 503);
        }
        return response()->json(["created"=>true], 201);
    }

    /**
   * Display the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
    public function show(Category $category)
    {
        return $category;
    }

    /**
   * Show the form for editing the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
    public function edit($id)
    {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param int $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, Category $category)
    {
        try{
            $category->category = $request->category;
            $category->save();
        }
        catch (\ErrorException $e){
            return response()->json(['updated' => false], 503);
        }
        return response()->json(['updated' => true], 201);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int $id
    * @return \Illuminate\Http\Response
    */
    public function destroy($id)
    {
        try{
            Category::destroy($id);
        }
        catch (\Exception $e){
            return response()->json([], 503);
        }
        return response()->json([], 201);
    }

    /**
    * show the specified resource items which has 1:M.
    *
    * @param  int $id
    * @return \Illuminate\Http\Response
    */
    public function items(Category $category)
    {
        return $category->items;
    }
}
