<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/account', [AuthController::class, 'getProfile'])->middleware('auth:api');
Route::get('/auth/refresh', [AdminAuthController::class, 'refreshToken'])->middleware('auth:api');

// product
Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{product}', [ProductController::class, 'getProduct']);
Route::post('/products/create-product', [ProductController::class, 'createProduct']);
Route::put('/products/update-product/{product}', [ProductController::class, 'updateProduct']);
Route::delete('/products/delete-product/{product}', [ProductController::class, 'deleteProduct']);
Route::get('/products/search-product', [ProductController::class, 'searchProduct']);

//admin
Route::post('/auth/admin/login', [AdminAuthController::class, 'login']);
Route::get('/auth/admin/account', [AdminAuthController::class, 'getProfile'])->middleware('auth:api');
Route::get('/auth/admin/refresh', [AdminAuthController::class, 'refreshToken'])->middleware('auth:api');

//employee
Route::get('/employee', [EmployeeController::class, 'getAllEmployees']);
Route::get('/employee/{employee}', [EmployeeController::class, 'getEmployee']);
Route::post('/employee/create-employee', [EmployeeController::class, 'createEmployee']);
Route::put('/employee/update-employee/{employee}', [EmployeeController::class, 'updateEmployee']);
Route::put('/employee/update-employee/detail', [EmployeeController::class, 'updateEmployeeDetail'])->middleware('auth:api');
Route::patch('/employee/update-employee/password', [EmployeeController::class, 'changePassword'])->middleware('auth:api');
Route::delete('/employee/delete-employee/{employee}', [EmployeeController::class, 'deleteEmployee']);

//user
Route::get('/user', [UserController::class, 'getAllUsers']);
Route::get('/user/{user}', [UserController::class, 'getUser']);
Route::post('/user/create-user', [UserController::class, 'createUser']);
Route::put('/user/update-user/detail', [UserController::class, 'updateUser'])->middleware('auth:api');
Route::patch('/user/update-user/password', [UserController::class, 'changePassword'])->middleware('auth:api');
Route::delete('/user/delete-user/{user}', [UserController::class, 'deleteUser']);

//order
Route::get('/order', [OrderController::class, 'getAllOrders']);
Route::get('/order/getAllById', [OrderController::class, 'getUserOrders'])->middleware('auth:api');
Route::get('/order/{order}', [OrderController::class, 'getOrderById']);
