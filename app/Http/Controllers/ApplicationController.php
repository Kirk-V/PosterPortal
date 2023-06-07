<?php

namespace App\Http\Controllers;
use App\Models\Settings;
use Illuminate\View\View;
use Illuminate\Http\Request;
use LdapRecord\Models\ActiveDirectory\Group;
use LdapRecord\Models\ActiveDirectory\User;

class ApplicationController extends Controller
{
    //applicationForm
    public function applicationForm()
    {
        // do a user check, we need to see if external user and should be allowed in
        // We can do this by checking the signed in user in ActiveDirectory (AD) and checking
        // the settings to see what groups should be allowed in. 
        // This can also give us some information on the user

        //
        try
        {
            $user = User::where('cn', $_SERVER['LOGON_USER'])
                    ->limit(1)
                    ->get()
                    ->first();
            $email = $user->getAttribute("mail")[0];
            $userName = $user->getAttribute("cn")[0];
            //Now check the appropriate groups to see if user is eligible to submit a poster
            $userGroups = $user->groups()->get();
            $rString = "";

            //Eligible groups
            $External = Settings::where('setting', 'external')->get()->first()->value;
            $uGrad = Settings::where('setting', 'undergrad')->get()->first()->value;
            if($External == 1)
            {
                //Currently Accepting external applications
                $rString .= "We are currently Accepting new External applications<br>";
                $groups = config('app.access.external.required');
                foreach($groups as $g)
                {
                    $group = Group::find("cn=$g, OU=Administration, dc=uwo, dc=ca");
                    if($user->groups()->exists($group))
                    {
                        $rString .= "<br>User $userName is in external group: ".$group;
                    }
                    else
                    {
                        $rString .= "<br>User $userName  is not in external group: ".$group;
                    }
                }
            }
            if($uGrad == 1)
            {
                //Currently Accepting Ugrad Applications. 
                $rString .= "We are currently Accepting new UGrad applications<br>"; 
            }
            foreach($userGroups as $g)
            {
                // $rString .= "<br>".$g->getAttribute('cn')[0];
                $rString .= "<br>".$g;
            }
            return $rString;
            // if(in_array($request->grant_holder_email, array($email, $userName)))
            // {
            //     //User can access
            //     return view('SpeedCodeApproval', ['cost'=>2, 'poster_id'=>$poster_id]);
            // }
            // else
            // {
            //     return "User Cannot Access";
            // }
        }
        catch(Exception $e)
        {
            //Should return a page indicating that user does not have access to application process

            return "no user found";
        }
        // return $rstring;

        // return view('ApplicationForm.PosterApplication');
    }
}
