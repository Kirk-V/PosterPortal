<?php

namespace App\Http\Controllers;

use App\Mail\PosterAcceptedForPrintingNotice;
use App\Mail\SSTSErrorNotification;
use App\Models\Jobs;
use App\Models\Posters;
use App\Models\Requests;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use LdapRecord\Models\ActiveDirectory\User;
// use LdapRecord\Models\ActiveDirectory\Entry;
// use LdapRecord\Models\ActiveDirectory\Group;
// use LdapRecord\Models\ActiveDirectory\Computer;
// use LdapRecord\Models\ActiveDirectory\Contact;
// use LdapRecord\Models\ActiveDirectory\Container;
// use LdapRecord\Models\ActiveDirectory\OrganizationalUnit;
// use LdapRecord\Models\ActiveDirectory\Printer;
// use LdapRecord\Models\ActiveDirectory\ForeignSecurityPrincipal;
// use LdapRecord\Models\Entry;


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
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        $posterID = $request->poster_id;
        //Move Poster To accepted State:
        Posters::acceptPoster($posterID);
        Posters::updatePoster($posterID, $request->all());
        $reqId = $request->request_id;
        Requests::updateRequest($reqId, $request->all());
        Jobs::newJob($posterID, $request->technician);
        $total = $request->total;

        try{
            $poster = Posters::find($posterID)->transactions()->updateOrCreate(['poster_id' => $posterID, 'total' => floatval($total)]);
        }
        catch(Exception $e)
        {
            Mail::to(['ssts-posters@uwo.ca'])->send(new SSTSErrorNotification("Error Finding poster when attempting to send notice. $e"));
            return response(["success" => false]);
        }
        
        // $poster->transactions()->updateOrCreate(['poster_id' => $poster->poster_id],['transaction_date' => $request->transaction_date, 'total_received' => $request->total_received]);
        try{
            Mail::to($request->email)->send(new PosterAcceptedForPrintingNotice($poster->poster_id));
        }
        catch(Exception $e)
        {
            //Mail Failed alert SSTS
            log::error("Failed to send email notification that poster has been approve $e");
            Mail::to(["ssts-posters@uwo.ca"])->send(new SSTSErrorNotification("Error Sending Poster Accepted for printing notice. $e"));
            //mailing error but still moved to accepted state so we can return true to front end.
            return response(["success" => True]);
        }
        return response(["success" => True]);
    }

    public function userInfo(Request $request)
    {
        // try
        // {
            // $user = User::whereStartsWith('cn', $_SERVER['LOGON_USER'])
            // ->limit(1)
            // ->get()->first();
            // $rString = "";
            // $rString = $user->getAttribute("cn")[0];
            // if($user->groups()->exists('uwo-u-staff'))
            // {
            //     $rString .= " User is in uwo-u-staff";
            // }

            // return $rString;
            // return "name: ".$user->getAttribute('givenname')[0];
        // catch(Exception $e)
        // {
        //     return "no user found";
        // }
    }

}
