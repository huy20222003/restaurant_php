<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TableController;
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
Route::get('/auth/account', [AuthController::class, 'getProfile'])->middleware(['auth:api', 'role:user']);
Route::get('/auth/refresh', [AdminAuthController::class, 'refreshToken'])->middleware(['auth:api', 'role:user']);

// product
Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{product}', [ProductController::class, 'getProduct']);
Route::post('/products/create-product', [ProductController::class, 'createProduct'])->middleware(['auth:api']);
Route::put('/products/update-product/{product}', [ProductController::class, 'updateProduct'])->middleware(['auth:api']);
Route::delete('/products/delete-product/{product}', [ProductController::class, 'deleteProduct'])->middleware(['auth:api']);
Route::get('/products/search-product', [ProductController::class, 'searchProduct']);

//admin
Route::post('/auth/admin/login', [AdminAuthController::class, 'login']);
Route::get('/auth/admin/account', [AdminAuthController::class, 'getProfile'])->middleware('auth:api');
Route::get('/auth/admin/refresh', [AdminAuthController::class, 'refreshToken'])->middleware('auth:api');

//employee
Route::get('/employee', [EmployeeController::class, 'getAllEmployees'])->middleware(['auth:api']);
Route::post('/employee/create-employee', [EmployeeController::class, 'createEmployee'])->middleware(['auth:api']);
Route::get('/employee/{employee}', [EmployeeController::class, 'getOneEmployee'])->middleware(['auth:api']);
Route::put('/employee/update-employee/{employee}', [EmployeeController::class, 'updateEmployee'])->middleware(['auth:api']);
Route::put('/employee/update-employee/detail', [EmployeeController::class, 'updateEmployeeDetail'])->middleware(['auth:api']);
Route::patch('/user/update-employee/avatar', [EmployeeController::class, 'updateAvatar'])->middleware(['auth:api']);
Route::patch('/employee/update-employee/password', [EmployeeController::class, 'changePassword'])->middleware(['auth:api']);
Route::delete('/employee/delete-employee/{employee}', [EmployeeController::class, 'deleteEmployee'])->middleware(['auth:api']);

//user
Route::get('/user', [UserController::class, 'getAllUsers'])->middleware(['auth:api']);
Route::post('/user/create-user', [UserController::class, 'createUser'])->middleware(['auth:api']);
Route::get('/user/{user}', [UserController::class, 'getUser'])->middleware(['auth:api']);
Route::put('/user/update-user/detail', [UserController::class, 'updateDetailUser'])->middleware(['auth:api', 'role:user']);
Route::patch('/user/update-user/avatar', [UserController::class, 'updateAvatar'])->middleware(['auth:api', 'role:user']);
Route::patch('/user/update-user/password', [UserController::class, 'changePassword'])->middleware(['auth:api', 'role:user']);
Route::delete('/user/delete-user/{user}', [UserController::class, 'deleteUser'])->middleware(['auth:api']);

//order
Route::get('/order', [OrderController::class, 'getAllOrders'])->middleware(['auth:api']);
Route::get('/order/getAllById', [OrderController::class, 'getUserOrders'])->middleware(['auth:api', 'role:user']);
Route::post('order/create-order', [OrderController::class, 'createOrder'])->middleware(['auth:api', 'role:user']);
Route::put('order/update-cart', [OrderController::class, 'updateCart'])->middleware(['auth:api']);
Route::get('/order/filter-order', [OrderController::class, 'filterOrderByStatus'])->middleware(['auth:api', 'role:user']);
Route::patch('/order/update-order/{orderId}', [OrderController::class, 'updateOrder'])->middleware(['auth:api']);
Route::get('/order/{order}', [OrderController::class, 'getOrderById'])->middleware(['auth:api']);

//category
Route::post('/category/create-category', [CategoryController::class, 'createCategory'])->middleware(['auth:api']);
Route::put('/category/update-category/{category}', [CategoryController::class, 'updateCategory'])->middleware(['auth:api']);
Route::delete('/category/delete-category/{category}', [CategoryController::class, 'deleteCategory'])->middleware(['auth:api']);
Route::get('/category', [CategoryController::class, 'getAllCategory']);
Route::get('/category/add-product', [CategoryController::class, 'addProductToCategory'])->middleware(['auth:api']);
Route::get('/category/{category}', [CategoryController::class, 'getOneCategory']);

//payments
Route::get('/payment', [PaymentController::class, 'getAllPayments'])->middleware(['auth:api']);
Route::post('/payment/create-payment', [PaymentController::class, 'createPayment'])->middleware(['auth:api', 'role:user']);
Route::post('/payment/create-payment-vnpay', [PaymentController::class, 'createPaymentVNPay'])->middleware(['auth:api', 'role:user']);
Route::get('/payment/vnpay-ipn', [PaymentController::class, 'vnpayIPN']);
Route::get('/payment/{payment}', [PaymentController::class, 'getOnePayment'])->middleware(['auth:api', 'role:user']);

//roles
Route::get('/role', [RoleController::class, 'getAllRole'])->middleware(['auth:api']);
Route::get('/role/{role}', [RoleController::class, 'getOneRole'])->middleware(['auth:api']);

//cart
Route::get('/cart', [CartController::class, 'getUserCart'])->middleware(['auth:api', 'role:user']);
Route::put('/cart/update-cart', [CartController::class, 'updateCart'])->middleware(['auth:api', 'role:user']);
Route::delete('/cart/update-cart/delete-product/{productId}', [CartController::class, 'deleteProductFromCart'])->middleware(['auth:api', 'role:user']);

//review
Route::post('/review/create-review', [ReviewController::class, 'createReview'])->middleware(['auth:api', 'role:user']);
Route::put('review/update-order', [ReviewController::class, 'updateOrder'])->middleware(['auth:api',]);
Route::get('/review/{productId}', [ReviewController::class, 'getAllReviewsByProduct']);

//table 
Route::get('/table', [TableController::class, 'getAllTables']);
Route::post('/table/create-table', [TableController::class, 'createTable'])->middleware(['auth:api']);
Route::put('/table/update-table/{tableId}', [TableController::class, 'updateTable'])->middleware(['auth:api']);
Route::delete('/table/delete-table/{tableId}', [TableController::class, 'deleteTable'])->middleware(['auth:api']);
Route::get('/table/{tableId}', [TableController::class, 'getSingleTable']);

//Reservation
Route::get('/reservation', [ReservationController::class, 'getAllReservations'])->middleware('auth:api');
Route::get('/reservation/get-by-id', [ReservationController::class, 'getAllReservationsById'])->middleware('auth:api');
Route::post('/reservation/filter-reservation', [ReservationController::class, 'filterReservation'])->middleware('auth:api');
Route::post('/reservation/create-reservation', [ReservationController::class, 'createReservation'])->middleware('auth:api');
