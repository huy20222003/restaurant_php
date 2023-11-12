<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Cart;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllUsers()
    {
        try {
            $users = User::orderBy('created_at', 'desc')->get();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'users' => $users]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:200',
                'username' => 'required|string|max:100|unique:users',
                'email' => 'required|email|max:100|unique:users',
                'phoneNumber' => 'string|required|max:10',
            ]);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $user = User::create([
                'fullName' => $request->fullName,
                'username' => $request->username,
                'email' => $request->email,
                'phoneNumber' => $request->phoneNumber,
                'password' => bcrypt(12345678),
            ]);
            $user->cart()->create([]);
            $user->assignRole('user');

            return response()->json(['success' => true, 'message' => 'User created successfully', 'user' => $user], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function getUser(User $user)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'user' => $user]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDetailUser(Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:200',
                'username' => 'required|string|max:100',
                'phoneNumber' => 'required|string|max:10',
                'shipAddress' => 'required|string|max:1000',
                'email' => 'required|email|max:100',
                'address' => 'required|string|max:1000'
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            // Cập nhật thông tin người dùng
            $user->fullName = $request->input('fullName');
            $user->username = $request->input('username');
            $user->email = $request->input('email');
            $user->phoneNumber = $request->input('phoneNumber');
            $user->address = $request->input('address');
            $user->shipAddress = $request->input('shipAddress');
            $user->save();

            return response()->json(['success' => true, 'message' => 'User updated successfully', 'user' => $user]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'newPassword' => 'required|string|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $user->password = bcrypt($request->input('newPassword'));
            $user->save();

            return response()->json(['success' => true, 'message' => 'Password changed successfully']);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteUser(User $user)
    {
        try {
            // Lấy ID của người dùng
            $userId = $user->id;

            // Lấy duy nhất một giỏ hàng có userId tương ứng với người dùng
            $cart = Cart::where('userId', $userId)->first();

            if ($cart) {
                // Xoá giỏ hàng
                $cart->delete();
            }

            // Xoá người dùng
            $user->delete();

            return response()->json(['success' => true, 'message' => 'User and associated cart deleted successfully', 'user' => $user]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function updateAvatar(Request $request)
    {
        try {
            $avatarUpdate = $request->input('avatarUpdate');
            $user = auth()->user();

            if (!$user) {
                return response()->json(['success' => false, 'message' => 'User not found'], 404);
            }

            // Kiểm tra xem tệp đã tải lên chưa
            if (!$avatarUpdate) {
                return response()->json(['success' => false, 'message' => 'No avatar provided'], 400);
            }

            $response = cloudinary()->upload($avatarUpdate, ['folder' => 'restaurant_php'])->getSecurePath();
            $user->avatar = $response;
            $user->save();

            return response()->json(['success' => true, 'message' => 'Update avatar successful'], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}
