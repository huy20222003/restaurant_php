<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{

    public function getAllReviewsByProduct(Request $request, $productId)
    {
        try {
            $reviews = Review::where('productId', $productId)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Retrieve data successfully',
                'reviews' => $reviews
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage()
            ], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function createReview(Request $request)
    {
        try {
            $data = $request->all();
            $productId = $data['productId'];
            $review = $data['review'];
            $rate = $data['rate'];
            $orderId = $data['orderId'];

            $user = Auth::user();

            if (!$productId || !$review || !$rate || !$orderId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Required field(s) missing'
                ], 400);
            }

            // Tạo một đánh giá mới
            $newReview = new Review();
            $newReview->productId = $productId;
            $newReview->review = $review;
            $newReview->rate = $rate;
            $newReview->userId = $user->id;
            $newReview->orderId = $orderId;
            $newReview->save();

            // Lấy tất cả đánh giá cho sản phẩm
            $reviews = Review::where('productId', $productId)->get();

            // Tính toán tổng số điểm và điểm trung bình
            $totalRate = $reviews->sum('rate');
            $rateAvg = number_format($totalRate / count($reviews), 1);

            // Cập nhật điểm trung bình trong bảng sản phẩm
            $product = Product::find($productId);
            $product->rate = $rateAvg;
            $product->save();

            return response()->json([
                'success' => true,
                'message' => 'Review added successfully',
                'review' => $newReview,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage()
            ], 500);
        }
    }

    public function updateOrder(Request $request)
    {
        try {
            $orderId = $request->input('orderId');
            $productId = $request->input('productId');

            $updatedOrder = Order::where('id', $orderId)
                ->where('order_details.product.id', $productId)
                ->update([
                    '$set' => ['order_details.$.isReview' => true]
                ]);

            if (!$updatedOrder) {
                return response()->json(['success' => false, 'message' => 'Order not found'], 400);
            }

            $updatedOrder = Order::find($orderId);
            return response()->json(['success' => true, 'message' => 'Update order success', 'order' => $updatedOrder], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}
