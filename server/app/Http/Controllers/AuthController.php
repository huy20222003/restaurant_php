<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    public function getProfile(Request $request)
    {
        try {
            $user = Auth::user();

            return response()->json([
                'success' => true, 'message' => 'Retrieve data successfully', 'user' => $user
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
        $request->validate([
            'fullName' => 'required|string|255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phoneNumber' => 'required|string|max:10',
            'password' => 'required|string|min:8',
        ]);

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

            return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'User registered successfully'], 201);
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
            $user = Auth::user();
            $accessToken = $user->createToken('accessToken')->accessToken;
            $refreshToken = $user->createToken('refreshToken')->accessToken;

            return response()->json(['success' => true, 'accessToken' => $accessToken, 'refreshToken' => $refreshToken, 'message' => 'User login successfully'], 201);
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
            return response()->json(['success' => false, 'message' => 'Get new token failed', 'error' => $exception], 500);
        }
    }
}
