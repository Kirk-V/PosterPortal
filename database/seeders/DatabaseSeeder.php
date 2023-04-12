<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models;
use App\Models\Courses;
use App\Models\Posters;
use App\Models\Requests;
use App\Models\Transactions;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        error_log('Some message here.');
        // Posters::factory(10)->create();
        // Transactions::factory(10)->create();
        // Courses::factory(10)->create();
        // Requests::factory(10)->create();

        $poster = Models\Posters::factory()
                ->has(Models\Requests::factory()) //course_id = 1
                ->has(Models\Jobs::factory()) //course_id = 2
                ->has(Models\Transactions::factory())
                ->create()
                ->first();

        $course = Models\Courses::factory()  //will be id = 3
        ->has(Models\Transactions::factory(1)) //id=2 has course_id = 3
        ->has(Models\Requests::factory(1)) //id=2 has course_id = 3
        ->create()
        ->first();

        $transaction = Models\Transactions::factory()
            ->for($course)
            ->for($poster)
            ->create()
            ->first();
        

        //Add a request;
        $request = Models\Requests::factory()
            ->for($poster)
            ->for($course)
            ->create()
            ->first();



    

        $setting = Models\Settings::factory()
            ->create()
            ->first();

    }
}
