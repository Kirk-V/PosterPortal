<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;


class SettingsController extends Controller
{
    //
    static function successResponse($data, $message = null, $code = 200)
	{
		return response()->json([
			'status'=> 'Success', 
			'message' => $message, 
			'data' => $data
		], $code);
	}

    static function errorResponse($message = null, $code)
	{
		return response()->json([
			'status'=>'Error',
			'message' => $message,
			'data' => null
		], $code);
	}

    static function getAllSettings()
    {
        return self::successResponse(Settings::all()->pluck('value', 'setting'), "Settings gathered");
    }

    static function upateSetting(Request $request)
    {
        $request->
    }
}
