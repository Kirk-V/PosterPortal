<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/h', function () {
    return "hello";
});


Route::get('/posterportal', function () {
    return Inertia::render('posterportal');
});

Route::get('/jobs', function () {
    return Inertia::render('posterportal', [
        'currentView' => 'jobs'
    ]);
});


Route::controller(RequestsController::class)->group(function () {
    Route::get('/requests', 'index');
    Route::get('/requests&id={id}',  'getRequest');
    Route::get('/requests/headers', 'getHeaders');
    Route::get('/requests/data', 'getAll');
    Route::get('/requests/pending', 'getPendingRequests');
    Route::get('/requests/pendingHeaders', 'getPendingRequestsHeaders');
    
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
        'currentView' => 'settings'
    ]);
});




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
