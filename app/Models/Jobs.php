<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
