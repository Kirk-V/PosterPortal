<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        return Requests::all();
    }

    public function getRequest($id)
    {
        $r = Requests::with(['courses'])->find($id);
        Log::info($r);
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

    // This function should retrieve all posters that have a pending state. These posters are joined with Requests
    // such that they can be sent to the front-end for changes
    public function getPendingRequests(){
        // $r = Posters::with(['requests'])->whereIn('state', 'pending')->all();
        return Posters::with(['requests'])->where('state', 'pending')->get();
    }

    //We need to get all assocaited data with a pending request, joined on the various relationships
    public function getPendingRequestData($id){
        log::info("got requests");
        $r = DB::table('Posters')
            ->leftJoin('Requests', 'Posters.poster_id', '=', 'Requests.poster_id')
            ->leftJoin('Courses', 'Requests.course_id', '=', 'Courses.course_id')
            ->where('Requests.request_id', $id)->first();

        log::info(DB::table('Posters')
        ->leftJoin('Requests', 'Posters.poster_id', '=', 'Requests.request_id')
        ->leftJoin('Courses', 'Requests.course_id', '=', 'Courses.course_id')
        ->where('Requests.request_id', $id)->toSql());
        return $r;
    }

    public function getPendingRequestsHeaders(){
        return ['Poster'=>'poster_id', 'First'=>'requests.first_name', 'Last'=>'requests.last_name', 'Email'=>'requests.email', 'Position'=>'requests.position', 'Status'=>'state'];
    }
}
