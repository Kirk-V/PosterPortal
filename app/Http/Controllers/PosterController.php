<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PosterController extends Controller
{
    //Gets the cost of a poster with the given ID
    public function getCostPerPoster($id)
    {

    }

    public function getPosterCostDetails($id)
    {
        return response()->json(Posters::getPosterCostDetails($id));
    }

    public function acceptPendingPoster(Request $request)
    {
        json_encode($request);
        // dd($request);
        $name = $request->input('first_name');
        // Log::info("NAMe: ".$name);
        Log::info($request->input('poster_id'));

        return response("hi");
    }
}
