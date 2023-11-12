<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartDetail;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUserCart()
    {
        try {
            $user = Auth::user();

            $cart = Cart::with(['cartDetails.product.imageProducts'])->where('userId', $user->id)
                ->first();

            if ($cart) {
                return response()->json(['success' => true, 'userCart' => $cart]);
            } else {
                return response()->json(['success' => true, 'message' => 'User cart empty']);
            }
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function updateCart(Request $request) {
        try {

            $validator = Validator::make($request->all(), [
                'productId' => 'required|integer',
                'size' => 'string|nullable',
                'color' => 'string|nullable',
                'quantity' => 'required|integer',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }
    

            $user = Auth::user();
            $cart = Cart::where('userId', $user->id)->first();
    
            if (!$cart) {
                return response()->json(['success' => false, 'error' => 'Cart not found'], 404);
            }
    
            // Kiểm tra xem đã tồn tại bản ghi trong CartDetail với productId tương tự chưa
            $existingCartDetail = CartDetail::where('cartId', $cart->id)
                ->where('productId', $request->productId)
                ->first();
    
            if ($existingCartDetail) {
                // Nếu đã tồn tại, cập nhật lại bản ghi đó
                $existingCartDetail->update([
                    'color' => $request->input('color') ?? $existingCartDetail->color,
                    'size' => $request->input('size') ?? $existingCartDetail->size,
                    'quantity' => $request->input('quantity') ?? $existingCartDetail->quantity,
                ]);                
            } else {
                // Nếu không tồn tại, tạo một bản ghi mới
                CartDetail::create([
                    'cartId' => $cart->id,
                    'productId' => $request->productId,
                    'color' => $request->color,
                    'size' => $request->size,
                    'quantity' => $request->quantity,
                ]);
            }
    
            return response()->json(['success' => true, 'message' => 'Cart updated successfully', 'cart' => $cart], 200);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
    

    public function deleteProductFromCart($productId)
    {
        try {
            $user = Auth::user();

            // Tìm giỏ hàng của người dùng
            $cart = Cart::where('userId', $user->id)->first();

            if (!$cart) {
                return response()->json(['success' => false, 'error' => 'Cart not found'], 404);
            }

            // Tìm sản phẩm trong giỏ hàng
            $existingItem = $cart->cartDetails->first(function ($item) use ($productId) {
                return str($item->id) == $productId;
            });

            if ($existingItem) {
                // Xóa sản phẩm khỏi giỏ hàng
                $existingItem->delete();
                // Cập nhật giỏ hàng
                $cart->refresh();

                return response()->json([
                    'success' => true,
                    'message' => 'Product removed from cart successfully!',
                    'cart' => $cart,
                ]);
            } else {
                return response()->json(['success' => false, 'message' => 'Product not found in the cart!'], 404);
            }
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
}
