<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;


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

    public static function acceptPoster($id)
    {
        try{
            $poster = Posters::find($id);
            $poster->state = 'accepted';
            $poster->save();
            return True;
        }
        catch(Exception $e)
        {
            log::error("Failed to find poster $id to accept");
            return false;
        }
    }
        
        


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
            if(in_array($key , $columnNames))
            {
                //Should check that key is valid
                Log::info("Updating Poster transaction $transaction->id  -- $key => $value");
                $transaction->$key = $value;
            }
        }
        $transaction->save();
    }
    #endregion
}
