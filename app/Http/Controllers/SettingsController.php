<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
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
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        return self::successResponse(Settings::all()->pluck('value', 'setting'), "Settings gathered");
        
        
    }

    static function updateSetting(Request $request)
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        $settingToUpdate = $request->setting;
        $newValue = $request->value;
        try
        {
            DB::table('Settings')->upsert(
                ['setting' => $settingToUpdate, 'value' => $newValue],
                ['setting']
                );
            // $setting = Settings::where('setting', '=', $settingToUpdate)->firstOrFail();
            // $setting->value = $newValue;
            // // $setting->save();
        }
        // catch(ModelNotFoundException $e)
        // {
        //     log::info("Model not found: but creating new setting in place $e");
        //     $set = Settings::create([
        //         'setting'=>$settingToUpdate, 
        //         'value' => $newValue]);
        //     try{
        //         $setting = Settings::where('setting', '=', $settingToUpdate)->firstOrFail();
        //     }
            catch(Exception $e)
            {
                log::error($e);
                return self::errorResponse("Could not find the setting: $settingToUpdate to update $e", 400);
            }
            return self::successResponse("", "Updated Setting $settingToUpdate to $newValue");
                        
    }


    static function getSetting($setting)
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
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
        if(!Gate::allows('applicant'))
        {
            abort(403);
        }
        try {
            $cost = Settings::where('setting', 'cost')->firstorfail();
            $undergrad = Settings::where('setting', 'undergrad')->firstorfail();
            $external = Settings::where('setting', 'external')->firstorfail();
            $discount = Settings::where('setting', 'discount')->firstorfail();

            return self::successResponse(['cost' => $cost->value, 'undergrad' => $undergrad->value, 'external' => $external->value, "discount" => $discount->value], "success");
        } catch (\Exception $e) {
            log::info($e);
            return self::errorResponse("Error retrieving form settings", 500);
        }

    }


    static function getDepartments(): JsonResponse
    {
        return self::successResponse(config('app.deparments'), "success");
    }
}
