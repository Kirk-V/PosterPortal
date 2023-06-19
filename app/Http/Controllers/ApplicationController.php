<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use App\Models\Courses;
use App\Models\Requests;
use App\Models\Settings;
use Illuminate\View\View;
use Illuminate\Http\Request;
use LdapRecord\Models\ActiveDirectory\Group;
use LdapRecord\Models\ActiveDirectory\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\ItemNotFoundException;


class ApplicationController extends Controller
{
    static function successResponse($data, $message = null, $code = 200)
	{
		return response()->json([
			'status'=> 'Success',
			'message' => $message,
			'data' => $data
		], $code);
	}

    static function errorResponse($message = null, $code, $data=null)
	{
		return response()->json([
			'status'=>'Error',
			'message' => $message,
			'data' => $data
		], $code);
	}

    //applicationForm
    public function applicationForm()
    {
        // do a user check, we need to see if external user and should be allowed in
        // We can do this by checking the signed in user in ActiveDirectory (AD) and checking
        // the settings to see what groups should be allowed in.
        // This can also give us some information on the user

        //This line is for testing without authorization of user.
        return Inertia::render('PosterApplication', [
            'departments'=> config('app.departments')]);
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
    public function newApplication(Request $request)
    {
        $validUser = true; //For testing, must turn on in prod.

        // try {
        //     $user = User::where('cn', $_SERVER['LOGON_USER'])
        //         ->limit(1)
        //         ->get()
        //         ->first();
        //     $rString = "";

        //     //Eligible groups
        //     $External = Settings::where('setting', 'external')->get()->first()->value;
        //     $uGrad = Settings::where('setting', 'undergrad')->get()->first()->value;

        //     // Check the necessary groups for user existance
        //     // First we check for SSC exitance
        //     if($this->userInAccessGroup($user, 'normal'))
        //     {
        //         $rString .= "User is a valid SSC user<br>";
        //         $validUser = true;
        //     }
        //     //Check external
        //     elseif ($External == 1) {
        //         $rString .= "We are currently Accepting new External applications<br>";
        //         //check if user is an external user:
        //         if($this->userInAccessGroup($user, 'external'))
        //         {
        //             $validUser = true;
        //         }
        //     }
        //     //check undergrad
        //     elseif ($uGrad == 1) {
        //         //Currently Accepting Ugrad Applications.
        //         $rString .= "<br>We are currently Accepting new UGrad applications<br>";
        //         //check if user is an external user:
        //         if($this->userInAccessGroup($user, 'undergrad'))
        //         {
        //             $validUser = true;
        //         }
        //     }
        // } catch (Exception $e) {
        //     //Should return a page indicating that user does not have access to application process
        //     return "<h1>invalid user</h1>";
        // }
        if($validUser)
        {
            //validate data
            $validationArray = array();
            $validData = true;
            try{
                //Make the poster and request model to put into DB. Only make these here, do not save unless all validation
                // passes.
                $data = $request->all();
                log::info($data);
                //Make Poster Object
                $poster = new Posters;
                $poster->state = 'pending';
                $poster->width = $request->width;
                $validationArray["width"] = true;
                $poster->height = $request->height;
                $validationArray['height'] = true;
                $poster->units = $request->units;
                $validationArray['units'] = true;


                //make Request Object
                $posterRequest = new Requests;
                $posterRequest->first_name = $request->first_name;
                $validationArray['first_name'] = true;
                $posterRequest->last_name = $request->last_name;
                $validationArray['last_name'] = true;
                $posterRequest->email = $request->email;
                $validationArray['email'] = true;
                $posterRequest->department = $request->department;
                $validationArray['department'] = true;
                $posterRequest->quantity = $request->quantity;
                $validationArray['quantity'] = true;
                //Check if discount is eligible
                $posterRequest->applied_for_discount = $request->apply_for_discount;
                log::info($request->apply_for_discount);
                log::info($posterRequest->applied_for_discount);
                if($posterRequest->applied_for_discount == 1)
                {
                    log::info("applying for disc");
                    //Undergrad discount request, check course and dept
                    $yearString = date("Y")."/".date("Y")+1;
                    try{
                        log::info("looking for course".$yearString." ".$posterRequest->department." ".$posterRequest->course_number);
                        $course = Courses::where('year', $yearString)
                            ->where('department', $posterRequest->department)
                            ->where('number', $request->course_number)->firstOrFail();
                        //if we reach this line we have found the course so the user can apply for the discount

                        $validationArray['applied_for_discount'] = true;
                        $validationArray['course_number'] = true;
                        $validationArray['department'] = true;
                        $posterRequest->courses()->save($course);
                    }
                    catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e)
                    {
                        //Couldn't find course
                        log::info("Course not found, cannot apply for student discount");
                        $validationArray['applied_for_discount'] = false;
                        $validationArray['department'] = false;
                        $validationArray['course_number'] = false;
                        $validData = false;
                        return $this->errorResponse("Course Not Found", 200, $validationArray);
                    }
                }
                else
                {
                    log::info("not applying for disc");
                }
                $posterRequest->payment_method = $request->payment_method;
                $validationArray['payment_method'] = true;

                if($posterRequest->payment_method == 'speed_code')
                {
                    $posterRequest->approver_type = $request->approver_type;
                    $validationArray['approver_type'] = true;
                    $posterRequest->approver_name = $request->approver_name;
                    $validationArray['approver_name'] = true;
                    $posterRequest->approver_email = $request->approver_email;
                    $validationArray['approver_email'] = true;
                    if($posterRequest->approver_type == 'grant_holder')
                    {
                        //If grant_holder, the approver name is equal to the grant holder name
                        $posterRequest->grant_holder_name = $posterRequest->approver_name;
                        $validationArray['grant_holder_name'] = true;
                    }
                    else{
                        //If dosa or administrator approver, the grant_holder name needs to be collected and is different
                        // than then approver name                        
                        $posterRequest->grant_holder_name = $request->grant_holder_name;
                        $validationArray['grant_holder_name'] = true;
                    }
                }

                //Validation succeeded, add in models to DB
                //Poster First
                // $poster->save();
                // $posterRequest->save();
                return $this->successResponse($validationArray, "success");
            }
            catch(\Exception $e)
            {
                log::info("Failed to validate poster data $e");
                $validData = false;
                return $this->errorResponse("not valid", 200, $validationArray );
            }

        }
        else
        {
            log::info("User attempted to submit poster but was not authorized");
        }

    }
}
