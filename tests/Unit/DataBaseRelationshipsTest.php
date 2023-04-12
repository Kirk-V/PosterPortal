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

    private ?Models\Settings $setting;

    /**
     * Summary of setUp
     * Test fixture creation. A poster which has an associated job,
     * request and transaction are created for testing. 
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        error_log("setting up");
        // Create a poster that has a one to one relationship with a request, transaction, and job
        $this->poster = Models\Posters::factory()
                ->has(Models\Requests::factory())
                ->has(Models\Jobs::factory())
                ->has(Models\Transactions::factory())
                ->create()
                ->first();

        $this->course = Models\Courses::factory()
            ->has(Models\Transactions::factory(1))
            ->has(Models\Requests::factory(1))
            ->create()
            ->first();

        $this->transaction = Models\Transactions::factory()
            ->for($this->course)
            ->for($this->poster)
            ->create()
            ->first();
        

        //Add a request;
        $this->request = Models\Requests::factory()
            ->for($this->poster)
            ->for($this->course)
            ->create()
            ->first();

        $this->job = Models\Jobs::factory()
            ->for($this->poster)
            ->create()
            ->first();

        

        $this->setting = Models\Settings::factory()
            ->create()
            ->first();

    }

    /**
     * Summary of tearDown
     * Test Fixture tearDown
     * @return void
     */
    protected function tearDown(): void
    {
        parent::tearDown();
        $this->poster = null;
        $this->request = null;
        $this->setting = null;
        $this->job= null;
        $this->transaction= null;
        $this->course= null;
    }

    /**
     * Summary of test_models_created
     *  Checks that all models are being created properly -- checks factories 
     * @return void
     */
    public function test_models_created(){
        $this->assertInstanceOf(Models\Posters::class, $this->poster, "Failed: Poster is type: ".gettype( $this->poster));
        $this->assertInstanceOf(Models\Requests::class, $this->request, "Failed: Request is type: ".gettype( $this->poster));
        $this->assertInstanceOf(Models\Settings::class, $this->setting, "Failed: Request is type: ".gettype($this->setting));
        $this->assertInstanceOf(Models\Transactions::class, $this->transaction, "Failed: Request is type: ".gettype($this->transaction));
        $this->assertInstanceOf(Models\Jobs::class, $this->job, "Failed: Request is type: ".gettype($this->job));
        $this->assertInstanceOf(Models\Courses::class, $this->course, "Failed: Request is type: ".gettype($this->course));
    }
    
    /**
     * Summary of test_poster_has_all_models
     *  Tests if a poster has the expected job, transaction, and request
     * @return void
     */
    public function test_poster_has_all_models(){
        $this->assertTrue($this->request->is($this->poster->requests), "Poster's request_id = ".$this->poster->requests->request_id."-- request has id= ".$this->request->request_id);
        $this->assertTrue($this->job->is($this->poster->jobs), "Poster has job with id = ".$this->poster->jobs->job_id."--Job has id= ".$this->job->job_id);
        $this->assertTrue($this->transaction->is($this->poster->transactions), "Poster has transaction with id = ".$this->poster->transactions->transaction_id."--transaction has id= ".$this->transaction->transaction_id);
        
    }
    public function test_course_has_requests_and_transaction(){
        $this->assertTrue($this->course->transactions->contains($this->transaction), "Transaction has course id: ".$this->transaction->course_id." Could not be associated with course id: ".$this->course->course_id);

        $this->assertTrue($this->course->requests->contains($this->request), "Requests with id: ".$this->request->request_id." Could not be associated with course id: ".$this->course->course_id);
    }

    public function test_request_belongs_to_course(){
        $this->assertTrue($this->request->courses->is($this->course));
    }

    public function test_transaction_belongs_to_course(){
        $this->assertTrue($this->transaction->courses->is($this->course));
    }


    public function request_belongs_to_poster(){
        

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
