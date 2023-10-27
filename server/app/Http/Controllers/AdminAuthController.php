<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Exception;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    public function getProfile(Request $request)
    {
        try {
            $employee = Auth::user();

            return response()->json([
                'success' => true, 'message' => 'Retrieve data successfully', 'user' => $employee
            ]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed!', 'error' => $exception], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:employees', // Sử dụng employees thay vì users
            'email' => 'required|string|email|max:255|unique:employees', // Sử dụng employees thay vì users
            'phoneNumber' => 'required|string|max:10',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Validation failed', 'errors' => $validator->errors()], 400);
        }

        try {
            $employee = Employee::create([ // Sử dụng Employee model thay vì User
                'fullName' => $request->fullName,
                'username' => $request->username,
                'email' => $request->email,
                'phoneNumber' => $request->phoneNumber,
                'password' => bcrypt($request->password),
            ]);

            $accessToken = $employee->createToken('accessToken')->accessToken;
            $refreshToken = $employee->createToken('refreshToken')->accessToken;

            return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'Employee registered successfully'], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Register failed!', 'error' => $exception], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        if (Auth::attempt($credentials)) {
            $employee = Auth::user();

            $accessToken = $employee->createToken('accessToken')->accessToken;
            $refreshToken = $employee->createToken('refreshToken')->accessToken;

            return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'Employee login successfully'], 200);
        }

        return response()->json(['success' => false, 'message' => 'Employee login failed!'], 401);
    }

    public function refreshToken(Request $request)
    {
        try {
            $token = $request->user()->token();
            $token->revoke();
            $accessToken = $request->user()->createToken('accessToken')->accessToken;

            return response()->json([
                'success' => true,
                'message' => "Get new token successfully",
                'accessToken' => $accessToken,
            ]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Get new token failed', 'error' => $exception], 500);
        }
    }
}
