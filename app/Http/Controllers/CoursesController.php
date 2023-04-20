<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    //

    public function getAllCourses()
    {
        return Courses::all();
    }

    public function getAllCoursesInYear($year)
    {
        return Courses::where('course_year', $year);
    }

    public function addCourse($number, $year, $dept, $instructor)
    {
        $course = new Courses;
        $course->course_number = $number;
        $course->course_year = $year;
        $course->course_department = $dept;
        $course->course_instructor = $instructor;
        if($course->save())
        {
            return response()->json(['success'=>true]);
        }
    }

}
