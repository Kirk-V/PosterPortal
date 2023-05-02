<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;


// Poster class is parent to request, jobs, and transactions
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

    #endregion
}
