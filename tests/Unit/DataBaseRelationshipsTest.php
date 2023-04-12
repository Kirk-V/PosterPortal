<?php

namespace Tests\Unit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
USE App\Models;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\AssignOp\Mod;

/**
 * These test are for relationships between tables in the database, and their supported models.
 * Each new relationship should be tested within. 
 */
class DataBaseRelationshipsTest extends TestCase
{
    use RefreshDatabase;

    private ?Models\Posters $poster;

    private ?Models\Requests $request;

    private ?Models\Courses $course;

    private ?Models\Jobs $job;

    private ?Models\Transactions $transaction;

    /**
     * Summary of setUp
     * Test fixture creation. A poster which has an associated job,
     * request and transaction are created for testing. 
     * @return void
     */
    protected function setUp(): void
    {
        // Create a poster that has a one to one relationship with a request, transaction, and job
        $this->poster = Models\Posters::factory()
                ->has(Models\Requests::factory())
                ->has(Models\Jobs::factory())
                ->has(Models\Transactions::factory())
                ->create()->first();
        
        Log::info("made poster");
        //Add a request;
        $this->request = Models\Requests::factory()
                ->for($this->poster)
                ->create()->first();

    }

    /**
     * Summary of tearDown
     * Test Fixture tearDown
     * @return void
     */
    protected function tearDown(): void
    {
        $this->poster = null;
        $this->request = null;
    }

    /**@test */
    public function poster_has_a_request(){
        Log::info("making poster\n");
        // Create a poster that has a one to one relationship with a request
        $poster = Models\Posters::factory()
                ->has(Models\Requests::factory())
                ->create()->first();
        
        Log::info("made poster");
        //Add a request;
        $request = Models\Requests::factory()
                ->for($poster)
                ->create()->first();

        $this->assertInstanceOf(Models\Posters::class, $request->posters);
        $this->assertInstanceOf(Models\Requests::class, $poster->requests);
        $this->assertTrue($poster->is($request->posters), "Poster id = ".$poster->poster_id." ".$poster->width. "-- parent poster is id= ".$request->posters->poster_id." ".$request->posters->width);
        $this->assertTrue($request->is($poster->requests), "Poster id = ".$poster->poster_id." ".$poster->width. "-- parent poster is id= ".$request->posters->poster_id." ".$request->posters->width);
    }


    public function test_request_belongs_to_poster(){

    }

    public function poster_has_a_transaction(){

    }

    public function transaction_belongs_to_poster(){
        
    }

    public function poster_has_a_jobs(){

    }

    public function job_belongs_to_poster(){

    }
}
