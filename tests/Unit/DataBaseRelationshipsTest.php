<?php

namespace Tests\Unit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
USE App\Models;
use PhpParser\Node\Expr\AssignOp\Mod;

/**
 * These test are for relationships between tables in the database, and their supported models.
 * Each new relationship should be tested within. 
 */
class DataBaseRelationshipsTest extends TestCase
{
    use RefreshDatabase;
    // /**
    //  * A basic unit test example.
    //  */
    // public function test_example(): void
    // {
    //     $this->assertTrue(true);
    // }

    /**@test */
    public function test_poster_has_a_request(){
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
