<?php

namespace App\Http\Controllers;

use App\Models\Jobs;
use App\Models\Posters;
use App\Models\Requests;
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
     *  When a new job is created an associated transaction is also made for later processing
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function acceptPendingPoster(Request $request)
    {
        $posterID = $request->poster_id;
        //Move Poster To accepted State:
        Posters::acceptPoster($posterID);
        Posters::updatePoster($posterID, $request->all());
        $reqId = $request->request_id;
        Requests::updateRequest($reqId, $request->all());
        Jobs::newJob($posterID, $request->technician);
        $total = $request->total;
        log::info("Total = ".$request->total);
        $poster = Posters::find($posterID)->transactions()->updateOrCreate(['poster_id' => $posterID, 'total' => floatval($total)]);
        // $poster->transactions()->updateOrCreate(['poster_id' => $poster->poster_id],['transaction_date' => $request->transaction_date, 'total_received' => $request->total_received]);
        return response(["success" => True]);
    }

}
