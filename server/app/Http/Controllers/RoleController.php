<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllRole()
    {
        try {
            $roles = Role::all();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'roles' => $roles]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function getOneRole(Role $role)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'role' => $role]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function show(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
