<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models;
use App\Models\Courses;
use App\Models\Jobs;
use App\Models\Posters;
use App\Models\Requests;
use App\Models\Transactions;
use Database\Factories\SettingsFactory;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',zzzzzz
        //     'email' => 'test@example.com',
        // ]);
        // error_log('Some message here.');
        Posters::factory()
        ->has(Requests::factory())
        // ->has(Jobs::factory())
        ->count(100)
        ->create();

        DB::table('settings')->insert([
            'setting' => 'cost',
            'value' => 5.5
        ]);
    }
}
