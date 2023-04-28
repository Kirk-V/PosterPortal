<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PosterController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\JobsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SettingsController::class)->group(function (){
    // Route::get('/poster/costDetails&id={id}', 'getPosterCostDetails');
    Route::get('/settings/all', 'getAllSettings');
});

Route::controller(JobsController::class)->group(function (){
    Route::put('/jobs/updateState', 'updateState');
});


Route::controller(PosterController::class)->group(function (){
    // Route::get('/poster/costDetails&id={id}', 'getPosterCostDetails');
    Route::post('/posters/acceptPending', 'acceptPendingPoster');
});
