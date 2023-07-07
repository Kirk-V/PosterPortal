<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReportController extends Controller
{
    //
    public function showReportView(Request $request)
    {
        return Inertia::render('Reports');
    }

    public function getData(Request $request)
    {
        //get the attributes
        $startDate = $request->query('start') ?? null;
        $endDate = $request->query('end');
        $payment_type = $request->query('payment');
        $PosterNumber = $request->poster_id ?? null;
        Log::info("Retrieve data for $startDate, $endDate");
    }
}
