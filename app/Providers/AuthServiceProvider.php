<?php

namespace App\Providers;
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
        $user = User::where('cn', $_SERVER['LOGON_USER'])
            ->limit(1)
            ->get()
            ->first();
        Auth::login($user);
        
        
        Gate::define('admin', function (User $user) {
            log::info("testing user");
            log::info($user->getAttribute("cn")[0]);

            return true;
        });

        Gate::define('applicant', function (User $user){
            //Depending on the settings, we are accepting applitions from 
            // 2) SSC Faculty/Staff ('normal group')
            // 2) SSC and SSC Undergrads
            // 3) SSC + undergrads

            //First check if user is SSC fac/Staff
            if($this->userInAccessGroup($user, 'normal'))
            {
                log::info("user  is normal");
                return true;
            }
            return false;
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
}
