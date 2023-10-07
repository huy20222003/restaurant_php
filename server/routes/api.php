<?php

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

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

Route::get('/', [UserController::class, 'index']);
Route::get('/{user}', [UserController::class, 'show']);
Route::post('/register', [UserController::class, 'store']);
Route::put('/update-user/{user}', [UserController::class, 'update']);
Route::delete('/delete-user/{user}', [UserController::class, 'destroy']);
