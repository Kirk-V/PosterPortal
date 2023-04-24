<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class JobsController extends Controller
{
    public function index()
    {
        Log::info("returning index interia");
        return Inertia::render('posterportal', [
            'currentView' => 'jobs',
        ]);
    }
}
