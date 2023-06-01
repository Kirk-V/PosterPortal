<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


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
        Log::info("update setting");
        $settingToUpdate = $request->setting;
        $newValue = $request->value;
        $setting = Settings::where("setting", $settingToUpdate)->update(['value' => floatval($newValue)]);
        if(!is_null($setting))
        {

            // $setting->update(['value' => $newValue]);
            // $setting->save();
            // Log::info("Updating setting $setting with value ".$setting->value);
            return self::successResponse("", "Updated Setting $settingToUpdate to $newValue");
        }
        else{
            return self::errorResponse("Could not find the setting: $settingToUpdate to update", 400);
        }
        
        

    }
}
