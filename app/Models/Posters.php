<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posters extends Model
{
    use HasFactory;

    protected $table = 'Posters';
    protected $primaryKey = 'poster_id';

    public $timestamps = false;
}
