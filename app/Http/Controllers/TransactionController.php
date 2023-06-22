<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\SDFTransactions;

class TransactionController extends Controller
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

    //Get SDF Balance
    static function getSDFBalance(){
        //To get the balance we need to get the total from the SDF transactions (deposits - withdrawals)
        // and subtract the total SDF discounts from the poster transactions. 

        $SDFDeposits = SDFTransactions::where('type', 'deposit')->sum('ammount');
        Log::info("SDF Deposits: $SDFDeposits");
        $SDFwithdrawals = SDFTransactions::where('type', 'withdrawal')->sum('ammount');
        Log::info("SDF Withdrawals: $SDFwithdrawals");
        $SDFBalance = $SDFDeposits-$SDFwithdrawals;

        $discounts = Posters::whereNotNull('discount')->sum('discount');
        Log::info("Poster Discounts: $discounts");

        $SDFBalance -= $discounts;
        return self::successResponse(["Balance"=>$SDFBalance], "success");
    }

    //Add SDF Transaction
    static function addSDFTransaction(Request $request)
    {
        //Validate:
        $validated = $request->validate([
            'type' => ['required', 'string', 'in:deposit,withdrawal'],
            'value'=> ['required', 'decimal:0,2', 'gt:0'],
        ]);
        $type = $request->type();
        $value = $request->value();
        $sdfTransaction = new SDFTransactions(['type'=> $type, 'ammount' => $value]);
        try{
            $sdfTransaction->save();
            return self::getSDFBalance();
        }
        catch(\Exception $e)
        {
            log::info($e);
            return self::errorResponse("Could not update balance", 500);
        }
    }

}
