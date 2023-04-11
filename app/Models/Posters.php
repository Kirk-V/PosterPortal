<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;


// Poster class is parent to request, jobs, and transactions
class Posters extends Model
{
    use HasFactory;

    protected $table = 'Posters';
    protected $primaryKey = 'poster_id';

    public $timestamps = false;


    #region Relationships

    public function request(): HasOne
    {
        return $this->hasOne(Requests::class, 'poster_id');
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transactions::class, 'poster_id');
    }


    public function jobs(): HasOne
    {
        return $this->hasOne(Jobs::class, 'poster_id');
    }

    #endregion
}
