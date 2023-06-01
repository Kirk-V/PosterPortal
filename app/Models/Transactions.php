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

    protected $fillable = ['transaction_date' , 'total_received', 'total'];
    public $timestamps = false;
    

    public function posters(): BelongsTo
    {
        return $this->belongsTo(Posters::class,'poster_id', 'poster_id');
    }
}
