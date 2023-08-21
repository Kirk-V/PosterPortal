<?php

namespace App\Providers;
use App\Models\Settings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use LdapRecord\Models\ActiveDirectory\User;

// use Illuminate\Support\Facades\Gate;
use LdapRecord\Models\ActiveDirectory\Group;
// use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        if(config('app.env') == 'homeDesktop')
        {
            return;
        }
        $user = User::where('cn', $_SERVER["AUTH_USER"] ?? 'kvande85')
            ->limit(1)
            ->get()
            ->first();
        Auth::login($user);


        Gate::define('admin', function (User $user) {
            log::info("testing user");
            log::info($user->getAttribute("cn")[0]);

            return $this->userIsAdmin($user);
        });

        Gate::define('applicant', function (User $user){
            //Depending on the settings, we are accepting applitions from
            // 2) SSC Faculty/Staff ('normal group')
            // 2) SSC and SSC Undergrads
            // 3) SSC + undergrads

            //First check if user is SSC fac/Staff
            return $this->UserHasAccess($user);
        });

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


    private function userIsAdmin(User $user): bool 
    {
        if($this->userInAccessGroup($user, 'admin'))
        {
            log::info("user is admin");
            return true;
        }
        return false;
    }

    /**
     * Summary of userHasAccess
     * @param \LdapRecord\Models\ActiveDirectory\User $user
     * @return bool
     */
    private function UserHasAccess(User $user): bool
    {
        //Eligible groups
        //Check if user is in SSC fac/staff
        if($this->userInAccessGroup($user, 'normal'))
            {
                log::info("user  is normal");
                return true;
            }
        //check if External users allowed and if user is an external user:
        try{
            $External = Settings::where('setting', 'external')->get()->first()->value;
        }
        catch(\Exception $e)
        {
            log::info("database error");
            return false;
        }


        if ($External == 1) {
            if($this->userInAccessGroup($user, 'external'))
            {
                log::info("user  is external");
                return true;
            }
        }
        try{
            $uGrad = Settings::where('setting', 'undergrad')->get()->first()->value;
        }
        catch(\Exception $e)
        {
            log::info("database error");
            return false;
        }

        if ($uGrad == 1) {
            //Currently Accepting Ugrad Applications.

            //check if user is an external user:
            if($this->userInAccessGroup($user, 'undergrad'))
            {
                log::info("user is undergrad");
                return true;
            }
        }
        //We have checked all possibilities but user not authenticated

        return false;
    }



}
