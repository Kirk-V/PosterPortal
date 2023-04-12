<?php

use App\Http\Controllers\RequestsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/h', function () {
    return 'Hello world';
});

Route::get('/request', [RequestsController::class, 'index']);

Route::get('/allRequest', [RequestsController::class, 'getAll']);


Route::get('/getOne', [RequestsController::class, 'getOne']);