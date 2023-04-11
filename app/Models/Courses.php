<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Courses extends Model
{
    use HasFactory;

    protected $table = 'Courses';
    protected $primaryKey = 'course_id';

    public $timestamps = false;


    public function request() :HasOne
    {
        return $this->hasOne(Requests::class, 'class_id');
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transactions::class, 'class_id');
    }
}
