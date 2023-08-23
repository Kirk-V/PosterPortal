<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
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
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        //To get the balance we need to get the total from the SDF transactions (deposits - withdrawals)
        // and subtract the total SDF discounts from the poster transactions. 

        $SDFDeposits = SDFTransactions::where('type', 'deposit')->sum('ammount');
        $SDFwithdrawals = SDFTransactions::where('type', 'withdrawal')->sum('ammount');
        $SDFBalance = $SDFDeposits-$SDFwithdrawals;

        $discounts = Posters::whereNotNull('discount')->sum('discount');

        $SDFBalance -= $discounts;
        return self::successResponse(["Balance"=>$SDFBalance], "success");
    }

    //Add SDF Transaction
    public function addSDFTransaction(Request $request)
    {
        if(!Gate::allows('admin'))
        {
            abort(403);
        }
        $data = $request->all();
        //Validate:
        $validated = $request->validate([
            'type' => ['required', 'string', 'in:deposit,withdrawal'],
            'value'=> ['required', 'decimal:0,2', 'gt:0'],
        ]);
        $type = $request->type;
        $value = $request->value;
        $sdfTransaction = new SDFTransactions(['type'=> $type, 'ammount' => $value]);
        try{
            $sdfTransaction->save();
            return self::getSDFBalance();
        }
        catch(\Exception $e)
        {
            log::error($e);
            return self::errorResponse("Could not update balance", 500);
        }
    }

}
