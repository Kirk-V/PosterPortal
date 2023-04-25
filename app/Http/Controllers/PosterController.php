<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Summary of PosterController
 */
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



    /**
     * Summary of acceptPendingPoster
     * When a Poster is accepted the following actions need to take place:
     *  Poster moves to accepted state
     *  Any changes to the poster or Request data must be updated.
     *  A New Job is created with the Poster ID equivalent to the newly accepted poster
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function acceptPendingPoster(Request $request)
    {
        $posterID = $request->poster_id;
        //Move Poster To accepted State:
        $poster = Posters::find($posterID);
        $poster->state = "accepted";
        $poster->save();
        Log::info("Found poster".$poster->poster_id);
        $name = $request->input('first_name');
        // Log::info("NAMe: ".$name);
        Log::info($request->header('content-type'));
        Log::info($request->cost);
        Log::info($request->getAcceptableContentTypes());
        return response("hi");
    }


    public function updatePoster($id, $newValues)
    {
        
    }
}