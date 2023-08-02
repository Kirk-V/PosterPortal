<?php

namespace App\Http\Controllers;

use App\Models\Posters;
use App\Models\Transactions;
use Illuminate\Database\Eloquent\Builder;
// use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReportController extends Controller
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

    static function errorResponse($message = null, $code, $data=null)
	{
		return response()->json([
			'status'=>'Error',
			'message' => $message,
			'data' => $data
		], $code);
	}

    public function showReportView(Request $request)
    {
        return Inertia::render('Reports');
    }

    public function getData(Request $request)
    {
        //get the attributes
        $startDate = $request->query('start') ?? null;
        $endDate = $request->query('end') ?? null;
        $payment_type = $request->query('payment') ?? null;
        $budgetYear = $request->query('budget_year') ?? null;
        $posterNumber = $request->poster_id ?? null;
        if(!is_Null($posterNumber))
        {
            //Just pull data for that poster if it exists
        }


        Log::info("Retrieve data for $startDate, $endDate, $payment_type");
        // $reportQuery = Transactions::with(['posters', 'posters.requests'])->whereDate('transaction_date', '>', $startDate == -1? '01/01/0001': $startDate);
        
        $posters = Posters::with(['transactions','jobs', 'requests'])->whereHas('transactions', function (Builder $dateQuery) use ($startDate, $endDate) {
            $dateQuery->where('transaction_date', '>=', $startDate == -1? '01/01/0001': $startDate)
            ->where('transaction_date', '<=', $endDate == -1? '01/01/2100': $endDate);
        });

        return $this->successResponse($posters->get());

        
            // log::info($reportQuery->toJson() );
    
        
        // $reportQuery->load(['posters']);
        // $reportQuery->load(['posters.requests']);
        switch($payment_type)
        {
            case "SDF":
                log::info("SDF only");
                $reportQuery = $reportQuery->where('applied_for_discount', 1);
                break;
            case "CASH":
                $reportQuery = $reportQuery->where('posters.requests.payment_method', 'cash');
                break;
            case "All":
                break;
            case "SPEED":
                $reportQuery = $reportQuery->where('posters.requests.payment_method', 'speed_code');
                break;
            default:                
        }
        // $reportData = Transactions::whereDate('transaction_date', '>', $startDate)->get();
        return $this->successResponse($reportQuery->get());
    }
}
