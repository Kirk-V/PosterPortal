<?php

namespace App\Rules;

use App\Models\Courses;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CourseExists implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        $courseNum = $value;
        $yearString = date("Y")."/".date("Y")+1;
        try{
            $course = Courses::where('number', $courseNum)->where('year', $yearString)->firstOrFail();
        }
        catch( \Exception $e){
            $fail('The attribute provided does not exist as an elgible undergrad course.');
        };
     
    }
}
