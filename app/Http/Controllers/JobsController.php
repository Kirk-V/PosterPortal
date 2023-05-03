<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Exception;
use App\Models\Jobs;
use Inertia\Inertia;
use App\Mail\PDFMail;
use App\Models\Posters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Contracts\Queue\Job;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;

/**
 * Summary of JobsController
 */
class JobsController extends Controller
{
    public function index()
    {
        Log::info("returning index interia");
        return Inertia::render('posterportal', [
            'currentView' => 'jobs',
        ]);
    }


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

    /**
     * Summary of Returns an associative array of table headers
     * of the form:
     *  headerAppearance => tableValue
     * Where header appearance is how the header should appear in the UI
     * and tableValue is the database column name for the heder. This provides
     * and easy way to parse the passed data if needed.
     * @return array
     */
    public function getJobsHeadings()
    {
        return  ['Poster No.' => 'poster_id', 'State' => 'job_state', 'Payment Type' => 'payment_method', 'Requisitioner' => 'First_name', 'Requisition type' => 'position', 'Requisitioner Eamil' => 'email', 'Department' => 'department', 'Print Date' => 'print_date'];
    }

    public function getJobsData($page, $entriesPerPage = 50)
    {
        $jobs = DB::table('Posters')
            ->join('Jobs', 'Posters.poster_id', 'Jobs.poster_id')
            ->join('Requests', 'Posters.poster_id', 'Requests.poster_id')
            ->leftJoin('Transactions', 'Posters.poster_id', 'Transactions.poster_id')
            ->select('Posters.*', 'Requests.*', 'jobs.job_state as job_state', 'jobs.technician', 'jobs.print_date', 'jobs.job_id')->skip(($page - 1) * $entriesPerPage)->take($entriesPerPage)->get([]);
        // return Posters::has('jobs')->with(['Jobs', 'Requests', 'transactions'])->get();
        return response($jobs);
    }


    //Function to update the job state of a job.
    public function updateState(Request $request)
    {
        $jobID = $request->input('job_id');
        $state = $request->input('job_state');
        log::info("$jobID being updated with state $state");
        DB::enableQueryLog();
        $job = Jobs::find($request->input('job_id'));
        log::info(DB::getQueryLog());
        if ($job == null) {
            log::info("job is null");
            return response(["success" => False]);
        }
        $job->job_state = $state;
        $job->save();
        return response(["success" => True]);
    }


    /**
     * Summary of emailPDF
     *      Uses query parameters to find the appropriate job and recipient of
     *      the receipt Email. Job Id is used to potentially find the recipients email
     *      depending on what type of request is needed. There is also a PDF blob passed
     *      which gets conveted to PDF and then temporarily stored. This is then used by
     *      the email model to send out the receipt. 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function emailPDFReceipt(Request $request)
    {
        // Extract the required parameters
        $recipientType = $request->query('to');
        $poster_id = $request->query('id');
        if (is_null($recipientType) || is_null($poster_id)) {
            return self::errorResponse("Cannot create PDF with provided query string", 400);
        }
        switch (strtolower($recipientType)) {
            case "requisitioner":
                Jobs::emailReceiptRequisitioner($poster_id);
                break;
            case "grandholder":
                Jobs::emailReceiptGrantHolder($poster_id);
                break;
            case "adminassistant":
                Jobs::emailReceiptSSTSAdminAssistant($poster_id);
                break;
        }
        log::info("Email to $recipientType request for $poster_id");
        // log::info($request->getContent());
        file_put_contents("../resources/views/mail/Receipt_$poster_id.pdf", $request->getContent());
        Mail::to("kvande85@uwo.ca")->send(new PDFMail($poster_id, $recipientType));
        return self::successResponse("none");
    }

    public function emailPickUp(Request $request)
    {
        $id = $request->query('id');
        log::info("Email request for $id");
        // log::info($request->getContent());
        // file_put_contents('myfile.pdf', $request->getContent());
        return self::successResponse("none");
    }


    /**
     * Summary of makeTransaction
     * @param Request $request
     *  Function to create the transaction associated with a job.
     *  First makes transaction, then calls update all data on poster.
     */
    public function makeTransactionAndUpdate(Request $request)
    {
        //Pull the ID of the poster.
        $poster = Posters::find($request->poster_id);
        if(is_null($poster))
        {
            return self::errorResponse("Could not find posterID in json", 400);
        }
        // $transaction = new Transactions;
        // $transaction->transaction_date = $request->transaction_date;
        // $transaction->total_received = $request->total_received;
        // $poster->transactions()->save($transaction);

        $poster->transactions()->updateOrCreate(['transaction_date' => $request->transaction_date, 'total_received' => $request->total_received]);


        Posters::updateAllPosterData($request->poster_id, $request->all());
        return self::successResponse("Success", "Success");
    }


    // /**
    //  * Summary of updateJobsData
    //  *  this function will update all available information in the requests json object. 
    //  *  It checks the column names in the posters, requests, and jobs tables. Careful as
    //  *  two column names could be the same in two different tables. Both tables will be updated
    //  *  with the value. 
    //  * @param Request $request
    //  */
    // public function updateJobsData(Request $request)
    // {
    //     //Update Poster Data
    //     $posterID = $request->poster_id;
    //     if (!is_Null($posterID)) {
    //         try {
    //             Posters::updateAllPosterData($posterID, $request->all());
    //             return true;
    //         } catch (Exception $e) {
    //             log::error($e);
    //             return false;
    //         }
    //     }
    //     else
    //     {
    //         throw new Exception("Poster ID Not Found in Json");
    //     }
    // }
}
