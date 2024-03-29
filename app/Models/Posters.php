<?php

namespace App\Models;

use App\Mail\PosterAcceptedForPrintingNotice;
use App\Mail\SSTSErrorNotification;
use App\Mail\SSTSSpeedCodeApprovedNotification;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use LdapRecord\Models\ActiveDirectory\User;
use App\Models\Requests;

// Poster class is parent to request, jobs, and transactions
/**
 * Summary of Posters
 */
class Posters extends Model
{
    use HasFactory;

    protected $table = 'Posters';
    protected $primaryKey = 'poster_id';

    public $timestamps = false;

    protected $fillable = [ 'state', 'width','height','quantity','units','discount_eligible', 'discount','speed_code_approved','cost','file_location'];


    /**
     * Get the posters cost with 2 decimals.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function cost(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => number_format((float)$value, 2, '.', '' )
        );
    }

    #region Relationships

    public function requests(): HasOne
    {
        return $this->hasOne(Requests::class, 'poster_id');
    }

    public function transactions(): HasOne
    {
        return $this->hasOne(Transactions::class, 'poster_id');
    }


    public function jobs(): HasOne
    {
        return $this->hasOne(Jobs::class, 'poster_id');
    }
    #endregion

    // Function to calculate the total cost estimate for a poster given the provided width,
    // height. Applies discount if the poster has a valid discount setting.
    // public function calculateTotal()

    //Retrieves the cost per poster, width, height, discount, and total for the poster
    public static function getPosterCostDetails($id)
    {
        $poster = Posters::find($id);
        $costPer = $poster->cost;
        $discount = $poster->discount_eligible ==  1 ? $poster->discount : 0;
        $total = ($poster->cost - $discount) * $poster->requests->quantity;
        return array('cost'=>$costPer, 'discount' => $discount, 'total' => $total);
    }



    /**
     * Summary of acceptPoster:
     * Updates the state of the poster to accepted
     * @param mixed $id Poster ID of the poster to accept
     * @return bool true if success, false otherwise
     */
    public static function acceptPoster($id)
    {
        try{
            $poster = Posters::find($id);
            $poster->state = 'accepted';
            $poster->save();
            //send email notification here
            return True;
        }
        catch(Exception $e)
        {
            log::error("Failed to find poster $id to accept");
            return false;
        }
    }
        
        


    /**
     * Summary of updatePoster:
     *  Finds the provided poster and updates it with all available  values in the param: updateArray.
     *  This is accomplished by checking the database for the available column names and checking if
     *  they exist in the update Array. If they exist, the data associated with the column is updated. 
     * @param mixed $id
     * @param mixed $updateArray
     * @return void
     */
    public static function updatePoster($id, $updateArray)
    {
        $poster = Posters::findOrFail($id);
        $columnNames = Schema::getColumnListing('Posters');
        foreach ($updateArray as $key => $value)
        {
            Log::info("Attempting to Update Poster $id -- $key => $value");
            if(in_array($key , $columnNames))
            {
                //Should check that key is valid
                Log::info("Updating Poster $id -- $key => $value");
                $poster->$key = $value;
            }
        }
        $poster->save();
    }


    /**
     * Summary of updateAllPosterData
     *  this functon will update all passed data associated with a poster. This
     *  updates the posters, requests, jobs, transactions tables where applicable. 
     *  If two tables have a column name which passed to the second parameter, both 
     *  tables will be updated with that value. The database should be normalized
     *  to prevent this. 
     * @param mixed $id
     * @param mixed $updateArray
     * @return void
     */
    public static function updateAllPosterData($id, $updateArray)
    {
        //get poster object.
        try{
            self::updatePoster($id, $updateArray);
            self::updateJobsRelationshipData($id, $updateArray);
            self::updateRequestsRelationshipData($id, $updateArray);
            self::updateTransactionRelationshipData($id, $updateArray);        
        }
        catch(ModelNotFoundException $e)
        {
            throw new Exception("Could not find model: $e");
        }
    }


    public static function updateJobsRelationshipData($poster_id, $updateArray)
    {
        
        $poster = Posters::findOrFail($poster_id);
        $job = $poster->jobs;
        //Should only be one job.
        
        $columnNames = Schema::getColumnListing('Jobs');
        foreach ($updateArray as $key => $value)
        {
            Log::info("Attempting to Update job $job->id -- $key => $value");
            if(in_array($key , $columnNames))
            {
                //Should check that key is valid
                Log::info("Updating Poster job $job->id  -- $key => $value");
                $job->$key = $value;
            }
        }
        $job->save();
    }


    public static function updateRequestsRelationshipData($poster_id, $updateArray)
    {
        $poster = Posters::findOrFail($poster_id);
        $request = $poster->requests;
        //Should only be one job.
        $columnNames = Schema::getColumnListing('Requests');
        foreach ($updateArray as $key => $value)
        {
            Log::info("Attempting to Update request $request->id -- $key => $value");
            if(in_array($key , $columnNames))
            {
                //Should check that key is valid
                Log::info("Updating request $request->id -- $key => $value");
                $request->$key = $value;
            }
        }
        $request->save();
    }

    public static function updateTransactionRelationshipData($poster_id, $updateArray)
    {
        $poster = Posters::findOrFail($poster_id);
        $transaction = $poster->transactions;
        //Should only be one job.
        $columnNames = Schema::getColumnListing('Transactions');
        foreach ($updateArray as $key => $value)
        {
            Log::info("Attempting to Update transaction $transaction->id -- $key => $value");
            if(in_array($key, $columnNames))
            {
                //Should check that key is valid
                //Check here that vlues not null. Sometimes if transaction has yet to be created this could occur.
                if(!($value == Null))
                {
                    Log::info("Updating Poster transaction $transaction->id  -- $key => $value");
                    $transaction->$key = $value;
                }

            }
        }
        $transaction->save();
    }

    

    public static function updateApprovalStatus($poster_id, $approval_status, $speed_code=null, $account=null): bool
    {
        //First get the poster and compare to user
        $poster = Posters::findOrFail($poster_id);
        $request = $poster->requests;
        try
        {
            $user = User::whereStartsWith('cn', $_SERVER['LOGON_USER'])
                ->limit(1)
                ->get()
                ->first();

            $email = $user->getAttribute("mail")[0];
            $userName = $user->getAttribute("cn")[0];
            //Check that the user logged in is able to approve
            if(in_array($request->approver_email, array($email, $userName)))
            {
                //User can update
                if($approval_status == 'accept')
                {
                    $poster->speed_code = $speed_code;
                    $poster->account = $account;
                    $poster->speed_code_approved = 1;
                    $poster->state = "ready";
                }
                elseif($approval_status == 'reject')
                {
                    //poster rejected
                    $poster->state = "rejected";
                    $poster->speed_code_approved = 0;
                }
                $poster->save();
                //Send notice that poster was accepted.
                try
                {
                    Mail::to(["kvande85@uwo.ca", "rmcornwa@uwo.ca"])->send(new SSTSSpeedCodeApprovedNotification($poster->poster_id));
                }
                catch(Exception $e)
                {
                    log::error("Failed to sent ssts notice that a speedcode has been approved  $e");
                    Mail::to(["kvande85@uwo.ca", "rmcornwa@uwo.ca"])->send(new SSTSErrorNotification("Error updating speedcode for poster # ".$poster->poster_id." $e"));
                }
                return true;
            }
            else
            {
                log::info("Invalid user tried to approve speedcode");
                return false;
            }
        }
        catch(Exception $e)
        {
            log::info("exception thrown when trying to accept/reject a speedcode: error $e");
            return false;
        }

    }
}
