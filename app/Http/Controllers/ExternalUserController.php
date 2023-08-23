<?php

namespace App\Http\Controllers;

use App\Models\ExternalUsers;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExternalUserController extends Controller
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

    public function getExternalUsers(): JsonResponse
    {
        return $this->successResponse(ExternalUsers::all());
    }


    public function addExternalUsers( Request $request ): JsonResponse
    {
        Log::info("USER SENT:");
        $userName = $request->id;
        
        Log::info($userName);
        try
        {
            $externalUser = new ExternalUsers(['username'=>$userName]);
        $externalUser->save();
        }
        catch(Exception $e)
        {
            log::info("couldnt delete");
            return $this->errorResponse("Could not delete the user $e", 500);
        }
        
        //If success return new list of external users
        return $this->getExternalUsers();
    }


    public function removeExternalUsers( Request $request ): JsonResponse
    {
        Log::info("USER SENT:");
        $userID = $request->id;
        
        Log::info($userID);
        try
        {
            ExternalUsers::find($userID)->delete();
        }
        catch(Exception $e)
        {
            log::info("couldnt delete");
            return $this->errorResponse("Could not delete the user", 500);
        }
        
        //If success return new list of external users
        return $this->getExternalUsers();
    }
}

