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

    static function successResponse($data, $message = null, $code = 200)
    {
        return response()->json([
            'status' => 'Success',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    static function errorResponse($message = null, $code)
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message,
            'data' => null
        ], $code);
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

    public function getAllCoursesJson()
    {
        $course = Courses::all();
        if(is_null($course))
        {
            return self::errorResponse("Could not get courses", 400);
        }
        return self::successResponse($course, "success", 200);

    }

}
