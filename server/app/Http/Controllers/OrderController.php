<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\CartDetail;
use App\Models\OrderDetail;
use App\Models\Product;
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
            // Lấy tất cả các đơn hàng với thông tin sản phẩm
            $orders = Order::with('orderDetails.product.imageProducts')->orderBy('created_at', 'desc')->get();

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
            $orders = Order::with('orderDetails.product.imageProducts')
                ->where('userOrder', $user->id)
                ->orderBy('created_at', 'desc')
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
            $order = Order::with('orderDetails.product.imageProducts')->find($orderId);

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
                'shipAddress' => 'required|string',
                'shippingFee' => 'required|numeric',
                'shippingUnit' => 'required|string',
                'paymentMethod' => 'required|string',
                'items' => 'required|string',
                'status' => 'required|string',
                'totalPrices' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $user = auth()->user();

            // Giải mã chuỗi JSON thành mảng
            $items = json_decode($request->items, true);

            $order = Order::create([
                'fullName' => $request->fullName,
                'phoneNumber' => $request->phoneNumber,
                'shipAddress' => $request->shipAddress,
                'shippingFee' => $request->shippingFee,
                'shippingUnit' => $request->shippingUnit,
                'paymentMethod' => $request->paymentMethod,
                'status' => $request->status,
                'totalPrices' => $request->totalPrices,
                'userOrder' => $user->id,
            ]);

            $orderDetails = [];
            foreach ($items as $item) {
                $product = Product::find($item['productId']);
                $orderDetail = OrderDetail::create([
                    'quantity' => $item['quantity'],
                    'size' => $item['size'],
                    'color' => $item['color'],
                    'productId' => $item['productId'],
                    'orderId' => $order->id,
                ]);
                $product->quantity = $product->quantity - $item['quantity'];
                $product->save();
                $orderDetails[] = $orderDetail;
            }

            $order->order_details = $orderDetails;

            return response()->json(['success' => true, 'message' => 'Order created successfully', 'order' => $order], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function updateCart(Request $request)
    {
        try {
            $productIds = json_decode($request->productIds, true);
            $user = auth()->user();
            $userCart = Cart::where('userId', $user->id)->first();
            if (!$userCart) {
                return response()->json(['success' => false, 'message' => 'Cart not found'], 400);
            } else {
                $userCartDetails = $userCart->cartDetails;

                foreach ($productIds as $productId) {
                    $userCartDetails = $userCart->cartDetails();
                    $userCartDetails->where('productId', $productId)->delete();
                }
                return response()->json(['success' => true, 'message' => 'updated cart successful'], 200);
            }
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function filterOrderByStatus(Request $request)
    {
        try {
            $status = $request->query('status');
            if (!$status) {
                return response()->json(['success' => false, 'message' => 'Invalid status.'], 400);
            } else {
                $orders = Order::where('status', $status)->with('product.imageProducts')->get();
                if ($orders->isEmpty()) {
                    return response()->json(['success' => false, 'message' => 'No matching order found.'], 404);
                } else {
                    return response()->json(['success' => true, 'message' => 'Found a suitable order.', 'orders' => $orders], 200);
                }
            }
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function updateOrder(Request $request, $orderId)
    {
        try {
            $status = $request->input('status');

            $updatedOrder = Order::where('id', $orderId)->update(['status' => $status]);

            if (!$updatedOrder) {
                return response()->json(['success' => false, 'message' => 'Order not found'], 404);
            }

            return response()->json(['success' => true, 'message' => 'Updated order successfully', 'order' => $updatedOrder]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
}
