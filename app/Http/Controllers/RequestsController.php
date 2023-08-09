<?php

namespace App\Http\Controllers;

use App\Mail\PosterRejectedNotice;
use App\Mail\PosterRejectionNoticeApprover;
use App\Models\Requests;
use App\Models\Posters;
use App\Models\Transactions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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
            'departments' => config("app.departments"),
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
     *      It must also create a Transaction that has 0 for all values. (Total etc).
     *      By doing this we can see that a poster job was not done, and no financial reconciliation should
     *      take place.
     * @return \Illuminate\Http\JsonResponse
     */
    public function rejectRequest($requestId){
        $request = Requests::find($requestId);
        $posterId = $request->poster_id;

        return $this->rejectPoster($posterId);

        if($request != null)
        {
            log::info("Rejecting Poster ".$request->posters->poster_id);
            $request->posters->state = 'rejected';
            //void transaction
            // $transaction = new Transactions();
            
            $request->posters->transactions()->create(['transaction_date'=>date("Y-m-d"), 'total_received'=>0, 'total'=>0]);
            $request->posters->save();

            log::info("transaction added");
            if($request->posters->state == 'rejected')
            {
                //Send email notification
                Mail::to($request->email)->send(new PosterRejectedNotice($request->poster_id));
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


    /**
     * Summary of rejectPoster:
     * This function effectively voids out a poster changing the state to rejected. It will also
     * update the Total in the related transaction to 0. It will also update the SDF discount to
     * 0 on Poster. When a poster is rejected an email is sent to all parties involved (requisitioner,
     * ssts, approver) where applicable. 
     * @param mixed $requestId
     * @return \Illuminate\Http\JsonResponse
     */
    public function rejectPoster($posterId): JsonResponse{
        try{
            DB::beginTransaction();//This allows failed DB transaction to be undone automatically if error thrown
            $poster = Posters::with('requests','transactions')->find($posterId);
            //We should update or create the transaction
            $poster->transactions()->updateOrCreate(['transaction_date'=>date("Y-m-d"), 'total_received'=>0, 'total'=>0]);

            $request = $poster->requests;
            //Make changed to poster
            $poster->state = 'rejected';
            $poster->discount = 0;
            $poster->save();
            DB::commit();
        }
        catch(\Exception $e)
        {
            log::info("Error $e");
            DB::rollBack();
            self::errorResponse("Could not retrieve and/or change necessary data. Please contact Kirk to manually reject poster", 500);
        }
        try{
            //If we have a poster that is paid for via speed code we must also notify the approver
            Mail::to($request->email)->send(new PosterRejectedNotice($request->poster_id));
            if($request->payment_method == 'speed_code')
            {
                log::info("sending email to grantholde");
                Mail::to($request->approver_email)->send(new PosterRejectionNoticeApprover($request->poster_id));
            }
        }
        catch(\Exception $e)
        {
            log::info("Couldnt send all emails to notify of rejection: $e");
            self::successResponse(["warning"=>"Could not send all rejection notice emails, please notify all parties manually"], "success");
        }
        return self::successResponse("false");
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
            ->select('Posters.*', 'Requests.*')
            ->where('Requests.request_id', $id)->first();

        log::info(DB::table('Posters')
        ->leftJoin('Requests', 'Posters.poster_id', '=', 'Requests.poster_id')
        ->leftJoin('Courses', 'Requests.course_id', '=', 'Courses.course_id')
        ->select('Posters.*', 'Requests.*')
        ->where('Requests.request_id', $id)->toSql());
        return $r;
    }

    public function getPendingRequestsHeaders(){
        return ['Poster'=>'poster_id', 'First'=>'requests.first_name', 'Last'=>'requests.last_name', 'Email'=>'requests.email', 'Payment'=>'requests.payment_method', 'Position'=>'requests.position', 'Status'=>'state'];
    }
}
