<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllEmployees()
    {
        try {
            $employees = Employee::orderBy('created_at', 'desc')->get();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'employees' => $employees]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createEmployee(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:200',
                'username' => 'required|string|max:100|unique:employees',
                'email' => 'required|string|max:100|unique:employees',
                'phoneNumber' => 'required|string|max:10',
                'salary' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $employee = Employee::create([
                'fullName' => $request->fullName,
                'username' => $request->username,
                'email' => $request->email,
                'salary' => $request->salary,
                'phoneNumber' => $request->phoneNumber,
            ]);
            $employee->assignRole('employee');

            return response()->json(['success' => true, 'message' => 'Employee created successfully', 'employee' => $employee], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function getOneEmployee(Employee $employee)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'employee' => $employee]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateEmployee(Request $request, Employee $employee)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:200',
                'username' => 'required|string|max:100',
                'email' => 'required|string|max:100',
                'phoneNumber' => 'required|string',
                'salary' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $employee->fullName = $request->input('fullName');
            $employee->username = $request->input('username');
            $employee->email = $request->input('email');
            $employee->phoneNumber = $request->input('phoneNumber');
            $employee->address = $request->input('address');
            $employee->salary = $request->input('salary');
            $employee->save();

            return response()->json(['success' => true, 'message' => 'Employee updated successfully', 'employee' => $employee]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function updateEmployeeDetail(Request $request)
    {
        try {
            $employee = $request->user();

            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string|max:200',
                'username' => 'required|string|max:100',
                'email' => 'required|string|max:100',
                'phoneNumber' => 'required|string|max:10',
                'address' => 'string|max:2000',
            ]);


            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            // Cập nhật thông tin người dùng
            $employee->fullName = $request->input('fullName');
            $employee->username = $request->input('username');
            $employee->email = $request->input('email');
            $employee->phoneNumber = $request->input('phoneNumber');
            $employee->address = $request->input('address');
            $employee->save();

            return response()->json(['success' => true, 'message' => 'Employee updated successfully', 'employee' => $employee]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $employee = $request->user();

            $validator = Validator::make($request->all(), [
                'newPassword' => 'required|string|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $employee->password = bcrypt($request->input('newPassword'));
            $employee->save();

            return response()->json(['success' => true, 'message' => 'Password changed successfully']);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteEmployee(Employee $employee)
    {
        try {
            $employee->delete();

            return response()->json(['success' => true, 'message' => 'Employee deleted successfully', 'Employee' => $employee]);
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
