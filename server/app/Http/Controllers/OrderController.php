<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllOrders()
    {
        try {
            // Lấy tất cả các đơn hàng
            $orders = Order::with('orderDetails.products')->get();

            // Trả về JSON response thành công
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'orders' => $orders]);
        } catch (Exception $exception) {
            // Trả về JSON response lỗi nếu có ngoại lệ xảy ra
            return response()->json(['success' => false, 'message' => 'Retrieve data failed!', 'error' => $exception->getMessage()], 500);
        }
    }

    public function getUserOrders()
{
    // Lấy người dùng hiện tại thông qua Passport
    $user = auth()->user();

    try {
        // Lấy tất cả các đơn hàng của người dùng cụ thể
        $orders = Order::with('orderDetails.products')
            ->where('userOrder', $user->id)
            ->get();

        // Trả về JSON response thành công
        return response()->json(['success' => true, 'message' => 'Retrieve user orders successfully', 'orders' => $orders]);
    } catch (Exception $exception) {
        // Trả về JSON response lỗi nếu có ngoại lệ xảy ra
        return response()->json(['success' => false, 'message' => 'Retrieve user orders failed!', 'error' => $exception->getMessage()], 500);
    }
}

    public function getOrderById($orderId)
    {
        try {
            // Sử dụng Eloquent để lấy đơn hàng theo ID
            $order = Order::with('orderDetails.products')->find($orderId);

            if (!$order) {
                return response()->json(['success' => false, 'message' => 'Order not found'], 404);
            }

            // Trả về JSON response thành công nếu tìm thấy đơn hàng
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'order' => $order]);
        } catch (Exception $exception) {
            // Trả về JSON response lỗi nếu có ngoại lệ xảy ra
            return response()->json(['success' => false, 'message' => 'Retrieve data failed!', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createOrder(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string',
                'phoneNumber' => 'required|string',
                'totalPrices' => 'required|numeric',
                'shipAddress' => 'required|string',
                'shippingFee' => 'required|numeric',
                'shippingUnit' => 'required|string',
                'paymentMethod' => 'required|string',
                'status' => 'required|string',
                'userOrder' => 'required|exists:users, id',
            ]);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $order = Order::create([
                'fullName' => $request->fullName,
                'phoneNumber' => $request->phoneNumber,
                'totalPrices' => $request->totalPrices,
                'shipAddress' => $request->shipAddress,
                'shippingFee' => $request->shippingFee,
                'shippingUnit' => $request->shippingUnit,
                'paymentMethod' => $request->paymentMethod,
                'status' => $request->status,
                'userOrder' => $request->userOrder,
            ]);

            return response()->json(['success' => true, 'message' => 'Order created successfully', 'order' => $order], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Order creation failed', 'error' => $exception], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function getOrder(Order $order)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'order' => $order]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateOrder(Request $request, Order $order)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string',
                'phoneNumber' => 'required|string',
                'totalPrices' => 'required|numeric',
                'shipAddress' => 'required|string',
                'shippingFee' => 'required|numeric',
                'shippingUnit' => 'required|string',
                'paymentMethod' => 'required|string',
                'status' => 'required|string',
                'userOrder' => 'required|exists:users, id',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $order->fullName = $request->input('fullName');
            $order->phoneNumber = $request->input('phoneNumber');
            $order->totalPrices = $request->input('totalPrices');
            $order->shipAddress = $request->input('shipAddress');
            $order->shippingFee = $request->input('shippingFee');
            $order->shippingUnit = $request->input('shippingUnit');
            $order->paymentMethod = $request->input('paymentMethod');
            $order->status = $request->input('status');
            $order->userOrder = $request->input('userOrder');
            $order->save();

            return response()->json(['success' => true, 'message' => 'Order updated successfully', 'order' => $order]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }
}
