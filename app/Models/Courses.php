<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Courses extends Model
{
    use HasFactory;

    protected $table = 'Courses';
    protected $primaryKey = 'course_id';

    public $timestamps = false;


    public function requests() : HasMany
    {
        return $this->hasMany(Requests::class, 'course_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transactions::class, 'course_id');
    }
}
