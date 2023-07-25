<?php

namespace App\Http\Controllers;
use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use LdapRecord\Models\ActiveDirectory\User;
use App\Models\Requests;

class Approvals extends Controller
{

    /**
     * Summary of approvalView
     *  This returns a view to an approver after checking that they are eligible to approve
     *  and provide a speedcode.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|string
     */
    public function approvalView(Request $request)
    {
        //check that user can access data
        $poster_id = $request->query('id');
        //get the requisitioner email to send the notification
        $poster = Posters::find($poster_id);
        $request = $poster->requests;
        try
        {
            // Extract the logged in username from server and use it 
            // to find the CN and email of the logged in user. This is compared
            // with the request approver email. If it matches, the user can
            // approve. Else the user is not eligible. 
            $user = User::whereStartsWith('cn', $_SERVER['LOGON_USER'])
                ->limit(1)
                ->get()->first();
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
        catch(\Exception $e)
        {
            return "no user found";
        }
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
        log::info("Rejecting speedCode");
        $rString = $id;
        //Get poster
        $rString .= $request->input('speedcode');
        if(Posters::updateApprovalStatus($id, "reject"))
        {
            Log::info("Rejecting speedcode and returning success");
            return view('approvalUpdated', ['success'=>true]);
        }
        else
        {
            return view('unableToProcess', ['success'=>true]);
        }
    }

}
