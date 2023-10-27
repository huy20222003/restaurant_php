<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllUsers()
    {
        try {
            $users = User::all();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'users' => $users]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed!', 'error' => $exception], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password), // You should hash the password for security.
            ]);

            return response()->json(['success' => true, 'message' => 'User created successfully', 'user' => $user], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'User creation failed', 'error' => $exception], 500);
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
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUser(Request $request)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:200',
                'username' => 'required|string|max:100',
                'phoneNumber' => 'required|string|max:10',
                'shipAddress' => 'required|string|max:1000',
                'email' => 'required|email',
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
            return response()->json(['success' => false, 'message' => 'Update data failed', 'error' => $exception], 500);
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
            return response()->json(['success' => false, 'message' => 'Password changed failed', 'error' => $exception], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteUser(User $user)
    {
        try {
            $user->delete();

            return response()->json(['success' => true, 'message' => 'User deleted successfully', 'user' => $user]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }
}
