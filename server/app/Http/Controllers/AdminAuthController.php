<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Exception;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    protected function guard()
    {
        return Auth::guard('employee');
    }

    public function getProfile(Request $request)
    {
        try {
            $employee = Auth::user();

            return response()->json([
                'success' => true, 'message' => 'Retrieve data successfully', 'user' => $employee
            ]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
    public function login(Request $request)
    {
        $employee = Employee::where('username', $request->username)->first();
        if ($employee) {
            if (Hash::check($request->password, $employee->password)) {
                $accessToken = $employee->createToken('accessToken')->accessToken;
                $refreshToken = $employee->createToken('refreshToken')->accessToken;
                return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'User login successfully'], 201);
            }
        }
        return response()->json(['success' => false, 'message' => 'User login failed!'], 500);
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
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
}
