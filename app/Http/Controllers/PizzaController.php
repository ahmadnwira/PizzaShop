<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzaController extends Controller
{

    /**
     * Enforce middleware.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pizza::all();
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
        try{
            Pizza::create([
                "name" => $request->name,
                "dough" => $request->dough,
                "toppings_count" => $request->toppings_count,
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Pizza $pizza)
    {
        return $pizza;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pizza $pizza)
    {
        try{
            // to avoid DB unknown column error
            $toUpdate = $request->toArray();
            unset($toUpdate['token']);

            $pizza->update($toUpdate);
        }
        catch (\ErrorException $e){
            return response()->json(['updated' => false], 503);
        }
        return response()->json(['updated' => true], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pizza $pizza)
    {
        try{
            $pizza->delete();
        }
        catch (\Exception $e){
            return response()->json([], 503);
        }
        return response()->json([], 201);
    }
}
