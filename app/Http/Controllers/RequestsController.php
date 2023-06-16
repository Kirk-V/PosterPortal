<?php

namespace App\Http\Controllers;

use App\Models\Requests;
use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

/**
 * Summary of RequestsController
 */
class RequestsController extends Controller
{
    //
    public function index()
    {
        log::info("returning index interia");
        return Inertia::render('posterportal', [
            'currentView' => 'requests',
            'data' => $this->getAll(),
        ]);
    }

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

    public function getAll()
    {
        return Requests::all();
    }

    public function getRequest($id)
    {
        $r = Requests::with(['courses'])->find($id);
        Log::info($r);
        return response($r);
    }

    public function getHeaders()
    {
        return response(json_encode(schema::getColumnListing('requests')), 200);
    }



    /**
     * Summary of rejectRequest
     *      If a request needs to be cancelled it must move the associated poster state to 'rejected'.
     *      By doing this we can see that a poster job was not done, and no financial reconciliation should
     *      take place.
     * @return \Illuminate\Http\JsonResponse
     */
    public function rejectRequest($requestId){
        $request = Requests::find($requestId);
        if($request != null)
        {
            log::info("Rejecting Poster ".$request->posters->poster_id);
            $request->posters->state = 'rejected';
            $request->posters->save();
            if($request->posters->state == 'rejected')
            {
                return self::successResponse("false");
            }
            else
            {
                return self::errorResponse("Found request id but couldn't change poster state", 404);
            }
        }
        else
        {
            return self::errorResponse("No request found", 404);
        }
    }


    // This function should retrieve all posters that have a pending state. These posters are joined with Requests
    // such that they can be sent to the front-end for changes
    public function getPendingRequests(){
        // $r = Posters::with(['requests'])->whereIn('state', 'pending')->all();
        return Posters::with(['requests'])
                    ->where('state', 'pending')
                    ->orWhere('state', 'ready')
                    ->get();
    }

    //We need to get all assocaited data with a pending request, joined on the various relationships
    public function getPendingRequestData($id){
        log::info("got requests");
        $r = DB::table('Posters')
            ->leftJoin('Requests', 'Posters.poster_id', '=', 'Requests.poster_id')
            ->leftJoin('Courses', 'Requests.course_id', '=', 'Courses.course_id')
            ->where('Requests.request_id', $id)->first();

        log::info(DB::table('Posters')
        ->leftJoin('Requests', 'Posters.poster_id', '=', 'Requests.request_id')
        ->leftJoin('Courses', 'Requests.course_id', '=', 'Courses.course_id')
        ->where('Requests.request_id', $id)->toSql());
        return $r;
    }

    public function getPendingRequestsHeaders(){
        return ['Poster'=>'poster_id', 'First'=>'requests.first_name', 'Last'=>'requests.last_name', 'Email'=>'requests.email', 'Payment'=>'requests.payment_method', 'Position'=>'requests.position', 'Status'=>'state'];
    }
}
