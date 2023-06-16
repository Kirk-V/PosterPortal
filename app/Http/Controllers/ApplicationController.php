<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\View\View;
use Illuminate\Http\Request;
use LdapRecord\Models\ActiveDirectory\Group;
use LdapRecord\Models\ActiveDirectory\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class ApplicationController extends Controller
{
    //applicationForm
    public function applicationForm()
    {
        // do a user check, we need to see if external user and should be allowed in
        // We can do this by checking the signed in user in ActiveDirectory (AD) and checking
        // the settings to see what groups should be allowed in.
        // This can also give us some information on the user

        //This line is for testing without authorization of user.
        return Inertia::render('PosterApplication');
        try {
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

            // Check the necessary groups for user existance
            //First we check for SSC exitance
            if($this->userInAccessGroup($user, 'normal'))
            {
                $rString .= "User is a valid SSC user<br>";
                return Inertia::render('PosterApplication');
            }

            //Check external
            if ($External == 1) {
                $rString .= "We are currently Accepting new External applications<br>";
                //check if user is an external user:
                if($this->userInAccessGroup($user, 'external'))
                {
                    $rString .= "User is a valid external user";
                }
            }
            else
            {
                $rString .= "<br>We are currently NOT Accepting new External applications<br>";
            }
            //check undergrad
            if ($uGrad == 1) {
                //Currently Accepting Ugrad Applications.
                $rString .= "<br>We are currently Accepting new UGrad applications<br>";
                //check if user is an external user:
                if($this->userInAccessGroup($user, 'undergrad'))
                {
                    $rString .= "User is a valid undergrad user";
                }
            }
            else
            {
                $rString .= "<br>We are currently NOT Accepting new UGrad applications<br>";
            }
            // foreach($userGroups as $g)
            // {
            //     // $rString .= "<br>".$g->getAttribute('cn')[0];
            //     $rString .= "<br>".$g;
            // }
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
        } catch (Exception $e) {
            //Should return a page indicating that user does not have access to application process
            return "no user found";
        }
        // return $rstring;

        // return view('ApplicationForm.PosterApplication');
    }

    /**
     * Summary of userInAccessGroup
     * @param \LdapRecord\Models\ActiveDirectory\User $user
     * @param mixed $group - the access group (set in config/app.access)
     * @return bool if user is in one of the groups represented in $group
     */
    private function userInAccessGroup(User $user, string $group): bool
    {
        //Currently Accepting external applications
        if(!config()->has("app.access.$group.required"))
        {
            log::error("Error in application controller - Failed to find config setting 'app.access.$group.required'");
        }
        $groups = config("app.access.$group.required");

        foreach ($groups as $g) {
            $cn = $g['cn'];
            $ous = $g['ou'];
            $ouString = "ou=" . implode(", ou=", $ous);
            $group = Group::find("cn=$cn, $ouString, dc=uwo, dc=ca");
            if ($user->groups()->exists($group)) {
                return true;
            }
        }
        return false;
    }


    /**
     * Summary of newApplication:
     *      Attempts to add a new request/job to the system. First validates that the user is able to submit
     *      by checking if they are in an appropriate user grou (Faculty, staff, external, or undergrad if available)
     *      If Valid and new request is added to system, send back success message for front end. Else send back a
     *      json array of the datafields showing true/false depending on validation result.
     * @param mixed $group - the access group (set in config/app.access)
     * @return bool if user is in one of the groups represented in $group
     */
    public function newApplication()
    {
        try {
            $validUser = false;
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

            // Check the necessary groups for user existance
            // First we check for SSC exitance
            if($this->userInAccessGroup($user, 'normal'))
            {
                $rString .= "User is a valid SSC user<br>";
                $validUser = true;
            }
            //Check external
            elseif ($External == 1) {
                $rString .= "We are currently Accepting new External applications<br>";
                //check if user is an external user:
                if($this->userInAccessGroup($user, 'external'))
                {
                    $validUser = true;
                }
            }
            //check undergrad
            elseif ($uGrad == 1) {
                //Currently Accepting Ugrad Applications.
                $rString .= "<br>We are currently Accepting new UGrad applications<br>";
                //check if user is an external user:
                if($this->userInAccessGroup($user, 'undergrad'))
                {
                    $validUser = true;
                }
            }
        } catch (Exception $e) {
            //Should return a page indicating that user does not have access to application process
            return "no user found";
        }
    }
}
