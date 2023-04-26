<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Summary of Jobs
 */
class Jobs extends Model
{
    use HasFactory;
    protected $table = 'Jobs';
    protected $primaryKey = 'job_id';

    public $timestamps = false;

    public function posters(): BelongsTo
    {
        return $this->belongsTo(Posters::class, 'poster_id', 'poster_id');
    }

    /**
     * Summary of newJob
     *  When a poster request is accepted, use this function to create a new job entry for it.
     *  This will allow the poster to appear in the jobs queue. Initially set to 'in_queue'.
     * @param mixed $posterId 
     *  The id of the associated poster
     * @return void
     */
    static function newJob($posterId)
    {
        $job = new Jobs;
        $job->poster_id = $posterId;
        $job->state = 'in_queue';
        $job->save();
    }
}
