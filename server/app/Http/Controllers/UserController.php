<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all(); // Lấy danh sách tất cả người dùng từ cơ sở dữ liệu

        if ($users->isEmpty()) {
            // Nếu không có người dùng nào trong cơ sở dữ liệu, trả về response thất bại
            return response()->json(['status' => 'false', 'message' => 'No users found'], 404);
        }

        // Nếu có người dùng trong cơ sở dữ liệu, trả về danh sách người dùng dưới dạng JSON và mã trạng thái 200 (OK)
        return response()->json(['status' => 'true', 'message' => 'Retrieve data success', 'data' => $users], 200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Kiểm tra và xác thực dữ liệu đầu vào từ $request
        $validatedData = $request->validate([
            'username' => 'required|string|max:100',
        ]);

        // Tạo người dùng mới
        $user = User::create($validatedData);

        return response()->json($user, 201); // Trả về thông tin người dùng mới đã tạo và mã trạng thái 201 (Created)
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user, 200); // Trả về thông tin của người dùng cụ thể và mã trạng thái 200 (OK)
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Kiểm tra và xác thực dữ liệu đầu vào từ $request
        $validatedData = $request->validate([
            'username' => 'required|string|max:200',
        ]);

        // Cập nhật thông tin của người dùng
        $user->update($validatedData);

        return response()->json($user, 200); // Trả về thông tin người dùng đã được cập nhật và mã trạng thái 200 (OK)
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete(); // Xóa người dùng khỏi cơ sở dữ liệu
        return response()->json(null, 204); // Trả về mã trạng thái 204 (No Content) để chỉ ra rằng người dùng đã được xóa thành công
    }
}
