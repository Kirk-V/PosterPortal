<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Gate;
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
        return response()->json([
            'status' => 'Error',
            'message' => $message,
            'data' => null
        ], $code);
    }

    public function getAllCoursesInYear($year)
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        return Courses::where('course_year', $year);
    }

    public function addCourse(Request $request)
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        $course = new Courses;
        $course->number = $request->number;
        $course->year = date("Y")."/".date("Y")+1;
        $course->department = $request->department;
        $course->instructor = $request->instructor;
        if($course->save())
        {
            return response()->json(['success'=>true]);
        }
    }

    public function getAllCoursesJson()
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        $course = Courses::all();
        if(is_null($course))
        {
            return self::errorResponse("Could not get courses", 400);
        }
        return self::successResponse($course, "success", 200);

    }

    public function deleteCourse(Request $request)
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
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
