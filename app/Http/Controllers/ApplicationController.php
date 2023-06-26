<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use App\Models\Courses;
use App\Models\Requests;
use App\Models\Settings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\View\View;
use Illuminate\Http\Request;
use LdapRecord\Models\ActiveDirectory\Group;
use LdapRecord\Models\ActiveDirectory\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\ItemNotFoundException;
use App\Rules\CourseExists;

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


    public function UserCanSubmit():bool{
        $user = User::where('cn', $_SERVER['LOGON_USER'])
            ->limit(1)
            ->get()
            ->first();
        $External = Settings::where('setting', 'external')->get()->first()->value;
        $uGrad = Settings::where('setting', 'undergrad')->get()->first()->value;
        if($this->userInAccessGroup($user, 'normal'))
        {
            return true;
        }
        elseif ($External == 1) {
            //check if user is an external user:
            if($this->userInAccessGroup($user, 'external'))
            {
                return true;
            }
        }
        //check undergrad
        elseif ($uGrad == 1) {
            //Currently Accepting Ugrad Applications.
            //check if user is an external user:
            if($this->userInAccessGroup($user, 'undergrad'))
            {
                return true;
            }
        }
        return false;
    }

    //applicationForm
    public function applicationForm()
    {
        // do a user check, we need to see if external user and should be allowed in
        // We can do this by checking the signed in user in ActiveDirectory (AD) and checking
        // the settings to see what groups should be allowed in.
        // This can also give us some information on the user
        $user = Auth::user();

        //This line is for testing without authorization of user.
        // return Inertia::render('PosterApplication', [
        //     'departments'=> config('app.departments')]);
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
                log::info("user  is normal");
                return Inertia::render('PosterApplication', ['departments'=> config('app.departments')]);
            }

            //Check external
            if ($External == 1) {
                $rString .= "We are currently Accepting new External applications<br>";
                //check if user is an external user:
                if($this->userInAccessGroup($user, 'external'))
                {
                    $rString .= "User is a valid external user";
                    return Inertia::render('PosterApplication', ['departments'=> config('app.departments')]);
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
     *      Attempts to add a new request/job to the system. First authorizes the user 
     *      checkingif they are in an appropriate user group (Faculty, staff, external, 
     *      or undergrad if available). Next, Validation is done using Laravel's built in.
     *      If Valid the new request is added to system and sends back success message for 
     *      front end. Else send back a json array of the datafields showing an error 
     *      if they failed validation.
     * @param mixed $group - the access group (set in config/app.access)
     * @return \Illuminate\Http\JsonResponse if user is in one of the groups represented in $group
     */
    public function newApplication(Request $request)
    {
        $validUser = false; 

        try {
            if($this->UserCanSubmit())
            {
                $validUser = true;
            }
            $user = User::where('cn', $_SERVER['LOGON_USER'])
                ->limit(1)
                ->get()
                ->first();
            // $rString = "";

            // //Eligible groups
            // $External = Settings::where('setting', 'external')->get()->first()->value;
            // $uGrad = Settings::where('setting', 'undergrad')->get()->first()->value;

            // // Check the necessary groups for user existance
            // // First we check for SSC exitance
            // if($this->userInAccessGroup($user, 'normal'))
            // {
            //     $rString .= "User is a valid SSC user<br>";
            //     $validUser = true;
            // }
            // //Check external
            // elseif ($External == 1) {
            //     $rString .= "We are currently Accepting new External applications<br>";
            //     //check if user is an external user:
            //     if($this->userInAccessGroup($user, 'external'))
            //     {
            //         $validUser = true;
            //     }
            // }
            // //check undergrad
            // elseif ($uGrad == 1) {
            //     //Currently Accepting Ugrad Applications.
            //     $rString .= "<br>We are currently Accepting new UGrad applications<br>";
            //     //check if user is an external user:
            //     if($this->userInAccessGroup($user, 'undergrad'))
            //     {
            //         $validUser = true;
            //     }
            // }
        } catch (\Exception $e) {
            //Should return a page indicating that user does not have access to application process
            log::info("Caught Exception when checking authorization for poster request: $e");
            return $this->errorResponse('User Not elgible for printing services', 500);
        }
        if($validUser)
        {
            $data = $request->all();
            log::info($data);
            $validated = $request->validate([
                'first_name' => ['required', 'string', 'max:250'],
                'width'=> ['required', 'decimal:0,4'],
                'height' => ['required','decimal:0,4'],
                'units' => ['required', 'in:cm,inches'],
                'last_name' => ['required','string', 'max:250'],
                'email' => ['required', 'email','string', 'max:250'],
                'department' => ['required', Rule::in(config('app.departments'))],
                'quantity' => ['required', 'integer'],
                'applied_for_discount' => ['integer','between:0:1' ],
                'course_number' => [Rule::requiredIf($request->applied_for_discount == '1'), Rule::prohibitedIf($request->applied_for_discount == '0'), 'size:4', new CourseExists],
                'payment_method' => ['required', 'in:speed_code,cash'],
                'approver_type' => [Rule::requiredIf($request->payment_method == 'speed_code'),'string', 'max:250', 'in:dosa,grant_holder,administrator'],
                'approver_name' => [Rule::requiredIf($request->payment_method == 'speed_code'),'string', 'max:250'],
                'approver_email' => [Rule::requiredIf($request->payment_method == 'speed_code'),'string', 'max:250'],
                'grant_holder_name' => [Rule::excludeIf($request->payment_method == 'cash'), Rule::requiredIf($request->approver_type != 'grant_holder')],
                'cost' => ['required','decimal:0,4'],
                'poster_file' => ['required', 'in:oneDrive,email'],
                'one_drive_link' => [Rule::requiredIf($request->poster_file == 'oneDrive')]
            ]);
            //validate data
            log::info("validation passed checking for existing posters");
            if($this->checkForReduntantPosters($user))
            {
                return $this->errorResponse("Too Many pending Posters", 500, $data=null);
            }
            //Check to see if user has already put in requests
            $validationArray = array();
            $validData = true;
            try{
                //Make the poster and request model to put into DB. Only make these here, do not save unless all validation
                // passes.
                log::info($request->apply_for_discount. "<<<");
                //Make Poster Object
                $poster = new Posters;
                $poster->fill([
                    'state' => 'pending',
                    'width' => $request->width,
                    'height' => $request->height,
                    'quantity' => $request->quantity,
                    'units' => $request->units,
                    'discount_eligible' => $request->apply_for_discount,
                    'speed_code_approved' => 0,
                    'discount' => floatval(0.00),
                    'cost' => $request->cost,
                    'file_location' => $request->poster_file, //This will have to be changed when we start uploading files directly.
                ]);

                $requestModel = new Requests([
                    'first_name' => $request->first_name ?? null,
                    'last_name' => $request->last_name ?? null,
                    'email' => $request->email ?? null,
                    'department' => $request->department ?? null,
                    'payment_method' => $request->payment_method ?? null,
                    'grant_holder_name' =>  $request->grant_holder_name ?? null,
                    'approver_name' => $request->approver_name ?? null,
                    'approver_type' => $request->approver_type ?? null,
                    'designate_name' => $request->designate_name ?? null,
                    'approver_email' => $request->approver_email ?? null,
                    'applied_for_discount'=> $request->apply_for_discount ?? null,
                    'user_logged_in' =>  $user->cn[0],
                ]);

                if($requestModel->applied_for_discount == 1)
                {
                    //Undergrad discount request, check course and dept
                    $yearString = date("Y")."/".date("Y")+1; //The course must be this year
                    try{
                        $course = Courses::where('year', $yearString)
                            ->where('department', $requestModel->department)
                            ->where('number', $request->course_number)->firstOrFail();
                    }
                    catch(\Illuminate\Database\Eloquent\ModelNotFoundException $e)
                    {
                        //Couldn't find course
                        return $this->errorResponse("Course Not Found", 200, $validationArray);
                    }
                }
                else
                {
                    $course = null;
                }

                DB::transaction( function() use ($poster, $requestModel, $course)  {
                    //Transaction allows for automatic rollback in case an exception is thrown
                    $poster->save();
                    $requestModel->posters()->associate($poster);
                    if($course)
                    {
                        $requestModel->courses()->associate($course);
                    }
                    $requestModel->save();
                });
                

                // $requestModel = $poster->requests()->create([
                //     'first_name' => $request->first_name ?? null,
                //     'last_name' => $request->last_name ?? null,
                //     'email' => $request->email ?? null,
                //     'department' => $request->department ?? null,
                //     'payment_method' => $request->payment_method ?? null,
                //     'grant_holder_name' =>  $request->grant_holder_name ?? null,
                //     'approver_name' => $request->approver_name ?? null,
                //     'approver_type' => $request->approver_type ?? null,
                //     'designate_name' => $request->designate_name ?? null,
                //     'approver_email' => $request->approver_email ?? null,
                //     'applied_for_discount'=> $request->apply_for_discount ?? null,
                //     'user_logged_in' =>  $user->cn[0],
                // ]);
                

                // $requestModel = new Requests();
                // //Add in relationships
                // $poster = $requestModel->posters()->create([
                //     'state' => 'pending',
                //     'width' => $request->width,
                //     'height' => $request->height,
                //     'quantity' => $request->quantity,
                //     'units' => $request->units,
                //     'discount_eligible' => $request->apply_for_discount,
                //     'speed_code_approved' => 1,
                //     'discount' => floatval(0.00),
                //     'cost' => $request->cost,
                //     'file_location' => $request->poster_file //This will have to be changed when we start uploading files directly.
                // ]);

                //Send Email notification Here
                return $this->successResponse(null, "success");
            }
            catch(\Exception $e)
            {
                log::info("Failed to validate poster data $e");
                log::info(implode(DB::getQueryLog()));
                return $this->errorResponse("not valid", 200, $validationArray);
            }

        }
        else
        {
            log::info("User attempted to submit poster but was not authorized");
            return $this->errorResponse("Too Many Pending Requests", 200);
        }

    }


    /**
     * Summary of checkForReduntantPosters: This fn will check all pending work associated with username
     * parameter. Returns false if beyond threshold set in app.config.
     * @param mixed $userName
     * @return bool
     */
    private function checkForReduntantPosters($userName)
    {  
        $count = DB::table('Posters')
        ->join('Requests', 'Posters.poster_id', 'Requests.poster_id')
        ->where('user_logged_in', $userName->cn[0])
        ->where('state', 'pending')->count();
        log::info("User ".$userName->cn[0]." already has $count pending jobs");
        return $count > config('app.user_request_limit') ? true:false;
    }
}
