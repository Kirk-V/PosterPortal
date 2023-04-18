<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class RequestsController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('posterportal', [
            'currentView' => 'requests',
            'data' => $this->getAll(),
        ]);
    }

    public function getAll()
    {
        // Requests::factory(10)->create();
        return Requests::all();
    }

    public function getOne()
    {
        $r = Requests::factory()->create();
        return $r;
    }

    public function getHeaders()
    {
        return response(json_encode(schema::getColumnListing('requests')), 200);
    }
}
