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

    static function getAllSettings()
    {
        return self::successResponse(Settings::all()->pluck('value', 'setting'), "Settings gathered");
    }

    static function updateSetting(Request $request)
    {
        Log::info("updating setting");
        $settingToUpdate = $request->setting;
        $newValue = $request->value;
        Log::info("Setting $settingToUpdate to $newValue");
        $setting = Settings::where("setting", $settingToUpdate)->update(['value' => floatval($newValue)]);
        if (!is_null($setting)) {
            // $setting->update(['value' => $newValue]);
            // $setting->save();
            // Log::info("Updating setting $setting with value ".$setting->value);
            return self::successResponse("", "Updated Setting $settingToUpdate to $newValue");
        } else {
            return self::errorResponse("Could not find the setting: $settingToUpdate to update", 400);
        }
    }


    static function getSetting($setting)
    {
        //open settings are cost, undergrad, external
        if (in_array($setting, ['cost', 'undergrad', 'external'])) {
            //public access
            try {
                $setting = Settings::firstorfail($setting);
                $value = $setting->value;
                return self::successResponse([$setting => $value], "success");
            } catch (\Exception $e) {
                return self::errorResponse("Error retrieving $setting", 500);
            }
        } else {
            //private endpoint
            return self::errorResponse("No access to $setting", 500);
        }
    }

    static function getFormSettings()
    {
        try {
            $cost = Settings::where('setting', 'cost')->firstorfail();
            $undergrad = Settings::where('setting', 'undergrad')->firstorfail();
            $external = Settings::where('setting', 'external')->firstorfail();

            return self::successResponse(['cost' => $cost->value, 'undergrad' => $undergrad->value, 'external' => $external->value], "success");
        } catch (\Exception $e) {
            log::info($e);
            return self::errorResponse("Error retrieving form settings", 500);
        }

    }
}
