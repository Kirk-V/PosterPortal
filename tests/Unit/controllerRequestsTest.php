<?php

namespace Tests\Unit;


use App\Http\Controllers\RequestsController;
use App\Models\Courses;
use App\Models\Posters;
use App\Models\Requests;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;

/**
 * Summary of controllerRequestsTest
 */
class controllerRequestsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }


    /**
     * Summary of test_getAll
     * @return void
     */
    public function test_getAll():void
    {
        //make a random number of Requests, add to db.
        $requestsCount = random_int(10,100);
        Requests::factory($requestsCount)->create();
        $rc = new RequestsController();
        $retrieved = $rc->getAll();
        $this->assertEquals($retrieved->count(), $requestsCount, "Did not retrieve all requests");
    }


    /**
     * Summary of test_getPendingRequests
     * Tests that the correct number of inserted 
     * @return void
     */
    public function test_getPendingRequests():void
    {
        $pendingPosters = [];
        // Make 100 request models where some of them have the 'pending' state
        // on their parent poster obj;
        for($i = 0; $i <100; $i++)
        {

            $newPoster = Posters::factory(1)->has(Requests::factory(1), 'requests')->create();
            error_log($newPoster->first()->state);
            if($newPoster->first()->state == 'pending')
            {
                array_push($pendingPosters, $newPoster->first());
            }
        }
        //get the pending posters
        $rc = new RequestsController();
        $retrievedPosters = $rc->getPendingRequests();
        $pendingPosterColletion = new Collection($items=$pendingPosters);

        //Check that pending posters and rtrieved posters are present
        $this->assertTrue($retrievedPosters->count() > 0, "No pending posters Retrieved");
        $this->assertTrue(count($pendingPosters) > 0,"No pending posters created");
        //check that the counts are equal
        $this->assertEquals($retrievedPosters->count(), $pendingPosterColletion->count(), "Inserted ".$pendingPosterColletion->count()."Pending posters, but retrieved ".$retrievedPosters->count());
    }

    /**
     * Summary of test_getPendingRequestData
     * @return void
     */
    public function test_getPendingRequestData():void
    {
        $ids = [];
        //Make a pending poster, with a connected request, that also has a course
        for($i = 0; $i <100; $i++)
        {
            
            $poster = Posters::factory(1)->has(Requests::factory(1), 'requests')->create()->first();
            error_log("poster create with id: ".$poster->poster_id);
            // error_log($poster->state);
            if($poster->state == 'pending')
            {
                // error_log("Pending");
                $requestID = $poster->requests->request_id;
                $posterId = $poster->poster_id;
                $courseId = $poster->requests->courses->course_id;
                error_log("adding to array: poster: ".$posterId." req: ".$requestID." course: ".$courseId);
                array_push($ids, array('poster_id'=>$posterId, 'request_id' =>$requestID, 'course_id' => $courseId));
            }
        }
        $this->assertTrue(count($ids) > 0, "did not create any ids :".count($ids));
        $rc = new RequestsController();
        foreach($ids as $id)
        {
            error_log("getting request with id: ".$id['request_id']);
            $request = $rc->getPendingRequestData($id['request_id']);
            // error_log("$request ");
            $this->assertEquals($request->poster_id, $id["poster_id"], "retrieved request with poster id:".$request->poster_id." but expected: ".$id["poster_id"] );
            $this->assertEquals($request->course_id, $id["course_id"], "retrieved request with course id:".$request->course_id." but expected: ".$id["course_id"] );
        }
    }



}
