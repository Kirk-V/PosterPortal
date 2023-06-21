<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Log;

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
        log::notice("Error in Courses Controller: $message");
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

    public function addCourse(Request $request)
    {
        $course = new Courses;
        $course->course_number = $request->number;
        // $course->course_year = $request->year;
        $course->course_department = $request->dept;
        $course->course_instructor = $request->instructor;
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

    public function deleteCourse(Request $request)
    {
        log::info("request here");
        try{
            $id = $request->query('id');
            if(is_null($id))
            {
                self::errorResponse("No course with provided id", 400);
            }
            $course = Courses::find($id);
            $course->delete();
            return self::successResponse($id,"Successfully deleted", 200);
        }
        catch(Exception $e)
        {
            return self::errorResponse($e, 400);
        }

    }

}
