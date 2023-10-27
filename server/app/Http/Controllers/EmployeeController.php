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
            $employees = Employee::all();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'employees' => $employees]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed!', 'error' => $exception], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createEmployee(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string',
                'username' => 'string',
                'email' => 'required|string',
                'phoneNumber' => 'required|string',
                'address' => 'string',
                'salary' => 'required|numeric',
                'status' => 'required|string'
            ]);
            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $employee = Employee::create([
                'fullName' => $request->fullName,
                'username' => $request->username,
                'email' => $request->email,
                'phoneNumber' => $request->phoneNumber,
                'address' => $request->address,
                'salary' => $request->salary,
                'status' => $request->status,
            ]);

            return response()->json(['success' => true, 'message' => 'Employee created successfully', 'employee' => $employee], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Employee created failed', 'error' => $exception], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function getEmployee(Employee $employee)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'employee' => $employee]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateEmployee(Request $request, Employee $employee)
    {
        try {
            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string',
                'username' => 'string',
                'email' => 'required|string',
                'phoneNumber' => 'required|string',
                'address' => 'string',
                'salary' => 'required|numeric',
                'status' => 'required|string'
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
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }

    public function updateEmployeeDetail(Request $request)
    {
        try {
            $employee = $request->user();

            $validator = Validator::make($request->all(), [
                'fullName' => 'required|string',
                'username' => 'string',
                'email' => 'required|string',
                'phoneNumber' => 'required|string',
                'address' => 'string',
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
            return response()->json(['success' => false, 'message' => 'Update data failed', 'error' => $exception], 500);
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
            return response()->json(['success' => false, 'message' => 'Password changed successfully failed', 'error' => $exception], 500);
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
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }
}
