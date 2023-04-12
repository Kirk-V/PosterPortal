<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transactions extends Model
{
    use HasFactory;
    protected $table = 'Transactions';
    protected $primaryKey = 'transaction_id';

    public $timestamps = false;
    

    public function posters(): BelongsTo
    {
        return $this->belongsTo(Posters::class,'poster_id');
    }

    public function courses(): BelongsTo
    {
        return $this->belongsTo(Courses::class, 'course_id');
    }
}
