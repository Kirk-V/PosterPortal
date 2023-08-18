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



        // Posters::factory()
        // ->has(Requests::factory())
        // ->has(Jobs::factory())
        // ->has(Transactions::factory())
        // ->count(100)
        // ->create();


        // Create appropriate test data we should have a range of customer and payment types
        // 

        // Posters::factory()
        // ->has(Requests::factory())
        // ->has(Jobs::factory())
        // ->count(1000)
        // ->create();


        //Add a course to reference later.
        Courses::factory([
            'number'=> 4850,
            'department' => 'psychology'
            ])->count(1)->create();

        //Two Posters that are Cash - Random SSC Departments
        //One without Discount and external...
        Posters::factory()
        ->has(Requests::factory([
            'payment_method' => 'cash', 
            'email' => 'kvande85@uwo.ca',
            'applied_for_discount' => false,
            'department' => "Other"]))
        ->count(1)
        ->create([
            'state' => 'pending',
            'speed_code' => null,
            'speed_code_approved' => 0,
            'discount_eligible' => 0,
        ]);
        //One with SDF Discount...
        Posters::factory()
        ->has(Requests::factory([
            'payment_method' => 'cash', 
            'applied_for_discount' => true,
            'email' => 'kvande85@uwo.ca',
            'course_department' => 'psychology']))
        ->count(1)
        ->create([
            'state' => 'pending',
            'speed_code' => null,
            'speed_code_approved' => 0,
            'discount_eligible' => 0,
        ]);

        //Speedcode payment - DOSA
        Posters::factory()
        ->has(Requests::factory([
            'payment_method' => 'speed_code', 
            'applied_for_discount' => false,
            'email' => 'kvande85@uwo.ca',
            'grant_holder_name' => 'grant one',
            'approver_name' => 'dosa Approver',
            'approver_type' => 'dosa',
            'approver_email' => 'kvande85@uwo.ca',
            'approver_department' => 'ssts']))
        ->count(1)
        ->create([
            'state' => 'pending',
            'speed_code' => null,
            'speed_code_approved' => 0,
            'discount_eligible' => 0,
        ]);

        Posters::factory()
        ->has(Requests::factory([
            'payment_method' => 'speed_code', 
            'applied_for_discount' => false,
            'email' => 'kvande85@uwo.ca',
            'approver_name' => 'admin approver',
            'approver_type' => 'administrator',
            'approver_email' => 'kvande85@uwo.ca',
            'approver_department' => 'ssts']))
        ->count(1)
        ->create([
            'state' => 'pending',
            'speed_code' => null,
            'speed_code_approved' => 0,
            'discount_eligible' => 0,
            'discount' => 0
        ]);


        DB::table('settings')->insert([
            'setting' => 'cost',
            'value' => 5.5
        ]);
        DB::table('settings')->insert([
            'setting' => 'undergrad',
            'value' => True
        ]);
        DB::table('settings')->insert([
            'setting' => 'external',
            'value' => True
        ]);
        DB::table('settings')->insert([
            'setting' => 'discount',
            'value' => 12
        ]);
    }

}
