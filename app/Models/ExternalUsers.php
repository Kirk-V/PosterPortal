<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalUsers extends Model
{
    use HasFactory;

    protected $table = 'ExternalUsers';
    protected $primaryKey = 'user_id';

    public $timestamps = false;

    public $fillable = ['username'];

}
