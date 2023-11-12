<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    protected function guard()
    {
        return Auth::guard('web'); 
    }

    public function getProfile(Request $request)
    {
        try {
            $user = Auth::user();

            return response()->json([
                'success' => true, 'message' => 'Retrieve data successfully', 'user' => $user
            ]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string|max:200',
            'username' => 'required|string|max:100|unique:users',
            'email' => 'required|string|email|max:100|unique:users',
            'phoneNumber' => 'required|string|max:10',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $user = User::create([
                'fullName' => $request->fullName,
                'username' => $request->username,
                'email' => $request->email,
                'phoneNumber' => $request->phoneNumber,
                'password' => bcrypt($request->password),
            ]);

            $accessToken = $user->createToken('accessToken')->accessToken;
            $refreshToken = $user->createToken('refreshToken')->accessToken;

            $user->cart()->create([]);
            $user->assignRole('user');

            return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'User registered successfully'], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        if (Auth::guard('web')->attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = $this->guard()->user();
            $accessToken = $user->createToken('accessToken')->accessToken;
            $refreshToken = $user->createToken('refreshToken')->accessToken;

            return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'User login successfully'], 201);
        } else {
            return response()->json(['success' => false, 'message' => 'User login failed!'], 500);
        }

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
