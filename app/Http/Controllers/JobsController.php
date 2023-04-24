<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

/**
 * Summary of JobsController
 */
class JobsController extends Controller
{
    public function index()
    {
        Log::info("returning index interia");
        return Inertia::render('posterportal', [
            'currentView' => 'jobs',
        ]);
    }

    /**
     * Summary of Returns an associative array of table headers
     * of the form:
     *  headerAppearance => tableValue
     * Where header appearance is how the header should appear in the UI
     * and tableValue is the database column name for the heder. This provides
     * and easy way to parse the passed data if needed.
     * @return array
     */
    public function getJobsHeadings(){
        return  ['Poster No.'=> 'poster_id','State'=>'state', 'Payment Type' => 'payment_method', 'Requisitioner' => 'First_name', 'Requisition type' => 'position', 'Requisitioner Eamil' => 'email', 'Department' => 'department', 'Print Date' => 'print_date'];
    }
}
