<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class Requests extends Model
{
    use HasFactory;
    protected $table = 'Requests';
    protected $primaryKey = 'request_id';

    public $timestamps = false;

    protected $fillable = ['first_name', 'last_name', 'email', 'department', 'payment_method', 'grant_holder_name', 'approver_name', 'approver_type', 'designate_name', 'approver_email', 'applied_for_discount', 'user_logged_in', 'course_department'];

    public function posters(): BelongsTo
    {
        return $this->belongsTo(Posters::class,'poster_id', 'poster_id');
    }

    public function courses(): BelongsTo
    {
        return $this->belongsTo(Courses::class, 'course_id', 'course_id');
    }


    public static function updateRequest($id, $updateArray)
    {
        $req = Requests::findOrFail($id);
        $columnNames = Schema::getColumnListing('Requests');
        foreach ($updateArray as $key => $value)
        {
            Log::info("Attempting to Update Request $id -- $key => $value");
            if(in_array($key , $columnNames))
            {
                //Should check that key is valid
                Log::info("Updating Request $id -- $key => $value");
                $req->$key = $value;
            }
        }
        $req->save();
    }
}
