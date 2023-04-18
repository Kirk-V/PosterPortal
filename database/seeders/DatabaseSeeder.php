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
        // error_log('Some message here.');
        Posters::factory(10)->create();
        Transactions::factory(10)->create();
        Courses::factory(10)->create();
        Requests::factory(10)->create();

       

    }
}
