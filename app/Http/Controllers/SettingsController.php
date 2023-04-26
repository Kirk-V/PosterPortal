<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;


class SettingsController extends Controller
{
    //

    static function getAllSettings()
    {
        return response()->json(Settings::all());
    }
}
