<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemsController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return Item::get([
            'id',
            'category_id',
            'name',
            'size',
            'price'
        ]);
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
    //   TODO: Authorization
      try{
          Item::create([
              "name" => $request->name,
              "category_id" => $request->category,
              "size" => $request->size,
              "price" => $request->price
          ]);
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
    public function show($id)
    {
        return Item::find($id);
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
    * @param  int $id
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, Item $item)
    {
        // TODO: Authorization
        try{
            $item->update($request->toArray());
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
            Item::destroy($id);
        }
        catch (\Exception $e){
            return response()->json([], 503);
        }
        return response()->json([], 201);
    }
}
