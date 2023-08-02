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
        //Create a table for posters
        Schema::create('Posters', function (Blueprint $table) {
            $table->id('poster_id')->first();
            // $table->foreignId('request_id')->nullable()->references('request_id')->on('Requests')->nullOnDelete();
            // $table->foreignId('job_id')->nullable()->references('job_id')->on('Jobs')->nullOnDelete();
            $table->enum('state', ['pending', 'ready', 'rejected', 'accepted', 'complete', 'paid']);
            $table->float('width', 8, 2);
            $table->float('height', 8, 2);
            $table->integer('quantity');
            $table->enum('units', ['cm', 'inches']);
            // $table->foreignId('transaction_id')->nullable()->references('transaction_id')->on('Transactions')->nullOnDelete();
            $table->boolean('discount_eligible');
            $table->string('speed_code')->nullable();
            $table->boolean('speed_code_approved');
            $table->float('discount', 8, 2);
            $table->float('cost', 8, 2);
            $table->string('file_location')->nullable();
        });


        Schema::create('Courses', function (Blueprint $table) {
            $table->id('course_id')->first();
            $table->string('number');
            $table->string('year');
            $table->string('department');
            $table->string('instructor');
        });

        Schema::create('Transactions', function (Blueprint $table) {
            $table->id('transaction_id')->first();
            $table->foreignId('poster_id')->nullable()->references('poster_id')->on('Posters')->nullOnDelete();
            $table->date('transaction_date')->nullable();
            $table->float('total', 8, 2);
            $table->float('total_received', 8, 2)->default(0);
            $table->boolean('reconciled')->default(false);
        });

        Schema::create('Requests', function (Blueprint $table) {
            $table->id('request_id')->first();
            $table->foreignId('poster_id')->nullable()->references('poster_id')->on('Posters')->nullOnDelete();
            $table->foreignId('course_id')->nullable()->references('course_id')->on('Courses')->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('department');
            $table->enum('payment_method', ['cash','speed_code']);
            $table->string('grant_holder_name')->nullable();
            $table->string('approver_name')->nullable();
            $table->string('approver_type')->nullable();
            $table->string('designate_name')->nullable();
            $table->string('approver_email')->nullable();
            $table->boolean('applied_for_discount');
            $table->enum('position', ['graduate', 'faculty', 'staff', 'undergraduate'])->nullable();
            $table->string('user_logged_in');
            
            // $table->string('email');

        });

        Schema::create('Jobs', function (Blueprint $table) {
            $table->id('job_id');
            $table->foreignId('poster_id')->nullable()->references('poster_id')->on('Posters')->nullOnDelete();
            $table->string('technician');
            $table->enum('job_state', ['in_queue', 'printed', 'pending_pickup', 'on_hold', 'cancelled', 'picked_up']);
            $table->date('print_date')->nullable();
            $table->boolean('emailed_receipt_req')->default(false);
            $table->boolean('emailed_receipt_grant_holder')->default(false);
            $table->boolean('emailed_receipt_ssts')->default(false);
        });

        Schema::create('SDFTransactions', function (Blueprint $table) {
            $table->id("sdf_transaction_id");
            $table->enum('type', ['deposit', 'withdrawal']);
            $table->float('ammount');
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
        Schema::dropIfExists('Transactions');
        Schema::dropIfExists('Jobs');
        Schema::dropIfExists('Requests');
        Schema::dropIfExists('Courses');
        Schema::dropIfExists('Posters');
        Schema::dropIfExists('SDFTransactions');
    }
};
