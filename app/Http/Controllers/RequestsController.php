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

    public function getOne($id)
    {
        $r = Requests::with('course_id	')->get($id);
        return response($r);
    }

    public function getHeaders()
    {
        return response(json_encode(schema::getColumnListing('requests')), 200);
    }


    public function updateRequest()
    {

    }

    public function deleteRequest(){

    }

    public function getFormData(){
        //for front end form
    }

    public function acceptRequest(){

    }

    public function requestIsReady(){
        
    }
}
