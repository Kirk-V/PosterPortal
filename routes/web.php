<?php

use App\Http\Controllers\ApplicationController;
use Inertia\Inertia;
use App\Http\Controllers\Approvals;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\PosterController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('posterportal');
});


Route::get('/posterportal', function () {
    return Inertia::render('posterportal');
});


Route::controller(JobsController::class)->group(function () {
    Route::get('/jobs', 'index');
    Route::get('/jobs/jobsHeaders', 'getJobsHeadings');
    Route::get('/jobs&page={page}', 'getJobsData');
});


Route::controller(ApplicationController::class)->group(function () {
    Route::get('/application', 'applicationForm');
    Route::post('/application', 'newApplication');
});


Route::controller(Approvals::class)->group(function () {
    Route::get('/approve', 'approvalView');
    Route::post('/approveSpeedCode&id={id}', 'approveSpeedCode');
});

Route::controller(RequestsController::class)->group(function () {
    Route::get('/requests', 'index');
    Route::get('/requests&id={id}',  'getRequest');
    Route::get('/requests/headers', 'getHeaders');
    Route::get('/requests/data', 'getAll');
    Route::get('/requests/pending', 'getPendingRequests');
    Route::get('/requests/pendingHeaders', 'getPendingRequestsHeaders');
    Route::get('/requests/pending&id={id}', 'getPendingRequestData');

    });

Route::controller(CoursesController::class)->group(function () {
    Route::get('/courses/all', 'getAllCourses');
    Route::get('/courses/year={year}',  'getAllCoursesInYear');
});

Route::controller(PosterController::class)->group(function (){
    Route::get('/poster/costDetails&id={id}', 'getPosterCostDetails');
    Route::get('/ldap', 'userInfo');
});



// Route::get('/requests', [RequestsController::class, 'index']);

// Route::get('/requests&id={id}', [RequestsController::class, 'getRequest(id)']);

// Route::get('/requests/headers', [RequestsController::class, 'getHeaders']);

// Route::get('/requests/data', [RequestsController::class, 'getAll']);


// Route::get('/requests/all', [RequestsController::class, 'getAll']);

// Route::get('/requests/all', function () {
//     return Inertia::render('posterportal', [
//         'currentView' => 'requests'
//     ]);
// });

Route::get('/settings', function () {
    return Inertia::render('posterportal', [
        'currentView' => 'settings',
        'user' => auth()->user(),
        'departments' => config("app.departments"),
    ]);
});


// Route::get('/ldap', function () {
//     return Inertia::render('posterportal', [
//         'currentView' => 'settings',
//         'user' => auth()->user()
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
