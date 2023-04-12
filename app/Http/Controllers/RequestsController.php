<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use Illuminate\Http\Request;

class RequestsController extends Controller
{
    //
    public function index()
    {
        return 'this is the index';
    }

    public function getAll()
    {
        Requests::factory(10)->create();
        return Requests::all();
    }

    public function getOne()
    {
        $r = Requests::factory()->create();
        return $r;
    }
}
