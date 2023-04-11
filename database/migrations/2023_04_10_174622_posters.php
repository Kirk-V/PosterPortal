<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Courses', function (Blueprint $table) {
            $table->id('course_id')->first();
            $table->string('course_number');
            $table->string('course_year');
            $table->string('course_instructor');
        });

        Schema::create('Requests', function (Blueprint $table) {
            $table->id('request_id')->first();
            // $table->foreignId('poster_id')->nullable()->references('poster_id')->on('Posters')->nullOnDelete();
            $table->foreignId('course_id')->nullable()->references('course_id')->on('Courses')->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->enum('payment_method', ['cash','speedcode']);
            $table->string('grant_holder_name')->nullable();
            $table->string('grant_holder_email')->nullable();
            $table->enum('position', ['graduate', 'faculty', 'staff', 'undergraduate']);
            $table->integer('quantity');
            // $table->string('email');
            
        });

        Schema::create('Jobs', function (Blueprint $table) {
            $table->id('job_id');
            // $table->foreignId('poster_id')->references('poster_id')->on('Posters')->nullOnDelete();
            $table->foreignId('request_id')->nullable()->references('request_id')->on('Requests')->nullOnDelete();
            $table->enum('state', ['in_queue', 'printed', 'on_hold']);
            
            // $table->boolean('discount');
        });

        Schema::create('Transactions', function (Blueprint $table) {
            $table->id('transaction_id')->first();
            $table->date('transaction_date');
            $table->float('total_recieved', 8, 2);
            $table->boolean('reconciled');
        });

        //Create a table for posters
        Schema::create('Posters', function (Blueprint $table) {
            $table->id('poster_id')->first();
            $table->foreignId('request_id')->nullable()->references('request_id')->on('Requests')->nullOnDelete();
            $table->foreignId('job_id')->nullable()->references('job_id')->on('Jobs')->nullOnDelete();
            $table->enum('state', ['pending', 'rejected', 'accepted', 'printed', 'paid', 'complete']);
            $table->float('width', 8, 2);
            $table->float('height', 8, 2);
            $table->foreignId('transaction_id')->nullable()->references('transaction_id')->on('Transactions')->nullOnDelete();
            $table->boolean('discount_eligible');
            $table->string('speed_code');
            $table->boolean('speed_code_approved');
            $table->float('discount', 8, 2);
        });

        Schema::create('Settings', function (Blueprint $table) {
            $table->string('setting');
            $table->string('value');
        });   
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
       
        Schema::dropIfExists('Settings');
        
       
        Schema::dropIfExists('Posters');
        Schema::dropIfExists('Transactions');
        Schema::dropIfExists('Jobs');
        Schema::dropIfExists('Requests');
        Schema::dropIfExists('Courses');
        
    }
};
