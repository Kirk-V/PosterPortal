<?php

namespace Tests\Unit;


use App\Http\Controllers\RequestsController;
use App\Models\Posters;
use App\Models\Requests;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

class controllerRequestsTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }


    public function test_getAll():void
    {
        //make a random number of Requests, add to db.
        $requestsCount = random_int(10,100);
        Requests::factory($requestsCount)->create();
        $rc = new RequestsController();
        $retrieved = $rc->getAll();
        $this->assertEquals($retrieved->count() , $requestsCount, "Did not retrieve all requests");
    }


    public function test_getPendingRequests():void
    {
        $pendingPosters = [];
        // Make 100 request models where some of them have the 'pending' state
        // on their parent poster obj;
        for($i = 0; $i <100; $i++)
        {
            $newPoster = Posters::factory()->has(Requests::factory())->create();
            if($newPoster->first()->state == 'pending')
            {
                array_push($pendingPosters, $newPoster->first());
            }
        }
        //get the pending posters
        $rc = new RequestsController();
        $retrievedPosters = $rc->getPendingRequests();
        $pendingPosterColletion = new Collection($retrievedPosters);

        //Check that pending posters and rtrieved posters are present
        $this->assertTrue($retrievedPosters->count() > 0);
        $this->assertTrue($pendingPosterColletion->count() > 0);
        //check that the counts are equal
        $this->assertEquals($retrievedPosters->count(), $pendingPosterColletion->count(), "Inserted ".$pendingPosterColletion->count()."Pending posters, but retrieved ".$retrievedPosters->count());
    }
}
