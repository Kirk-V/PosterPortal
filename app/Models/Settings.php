<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;


    protected $table = 'Settings';
    // protected $primaryKey = 'poster_id';
    protected $fillable =['setting','value'];
    public $timestamps = false;
}
