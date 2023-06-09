<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SDFTransactions extends Model
{
    use HasFactory;

    protected $table = 'SDFTransactions';

    protected $fillable = ['type', 'ammount'];

    public $timestamps = false;
}
