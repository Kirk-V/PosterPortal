<?php

namespace App\Http\Controllers;
use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use LdapRecord\Models\ActiveDirectory\User;
use App\Models\Requests;

class Approvals extends Controller
{
    //
    public function approvalView(Request $request)
    {
        //check that user can access data
        $poster_id = $request->query('id');
        ///get the requisitioner email to send the notification
        $poster = Posters::find($poster_id);
        $request = $poster->requests;
        $rString = "user ";
        try
        {
            $user = User::whereStartsWith('cn', $_SERVER['LOGON_USER'])
                ->limit(1)
                ->get()->first();
            // $rString = $user->getAttribute("cn")[0];
            // if($user->groups()->exists('uwo-u-staff'))
            // {
            //     $rString .= " User is in uwo-u-staff";
            // }
            $email = $user->getAttribute("mail")[0];
            $userName = $user->getAttribute("cn")[0];
            if(in_array($request->approver_email, array($email, $userName)))
            {
                //User can access
                return view('SpeedCodeApproval', ['request'=>$request, 'poster'=> $poster]);
            }
            else
            {
                return "User Cannot Access";
            }
        }
        catch(Exception $e)
        {
            return "no user found";
        }
        return $rstring;
    }

    public function approveSpeedCode(Request $request, $id)
    {
        //Check that user is authenticated for poster
        $rString = $id;
        //Get poster
        $rString .= $request->input('speedcode');
        if(Posters::updateApprovalStatus($id, "accept", $request->input('speedcode')))
        {
            return view('approvalUpdated', ['success'=>true]);
        }
        else
        {
            return view('unableToProcess', ['success'=>true]);
        }
    }

    public function rejectSpeedCode(Request $request, $id)
    {
        $rString = $id;
        //Get poster
        $rString .= $request->input('speedcode');
        if(Posters::updateApprovalStatus($id, "reject"))
        {
            return "Speed code rejected";
        }
        else
        {
            return 'speedcode not rejected';
        }
    }
    
}
