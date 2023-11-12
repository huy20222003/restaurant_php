<?php

namespace App\Http\Controllers;

use App\Models\Table;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllTables(Request $request) {
        try {
            $tables = Table::orderBy('created_at', 'desc')->get();
    
            return response()->json([
                'success' => true,
                'message' => 'Retrieve tables data successfully!',
                'tables' => $tables,
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createTable(Request $request) {
        try {
            $data = $request->all();
            $name = $data['name'];
            $description = $data['description'];
    
            if (!$name || !$description) {
                return response()->json([
                    'success' => false,
                    'message' => 'Required fields missing'
                ], 400);
            } else {
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|max:100|unique:tables',
                    'description' => 'required|string|max:1000',
                ]);
    
                if ($validator->fails()) {
                    return response()->json(['success' => false, 'message' => $validator->errors()], 400);
                }

                $table = new Table();
                $table->name = $name;
                $table->description = $description;
                $table->save();
    
                return response()->json([
                    'success' => true,
                    'message' => 'Create table successful',
                    'table' => $table
                ], 200);
            }
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function getSingleTable($tableId) {
        try {
            $table = Table::find($tableId);
    
            if (!$table) {
                return response()->json([
                    'success' => false,
                    'message' => 'Table not found'
                ], 404);
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Table found',
                'table' => $table
            ], 200);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateTable(Request $request, $tableId) {
        try {
            $data = $request->all();
            $name = $data['name'];
            $description = $data['description'];
    
            if (!$name || !$description) {
                return response()->json([
                    'success' => false,
                    'message' => 'Required fields missing'
                ], 400);
            } else {
                // Tìm bản ghi theo ID
                $table = Table::find($tableId);
    
                if (!$table) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Table not found'
                    ], 404);
                }

                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|max:100',
                    'description' => 'required|string|max:1000',
                ]);
    
                if ($validator->fails()) {
                    return response()->json(['success' => false, 'message' => $validator->errors()], 400);
                }
    
                // Cập nhật thông tin của bản ghi
                $table->name = $name;
                $table->description = $description;
                $table->save();
    
                return response()->json([
                    'success' => true,
                    'message' => 'Update successful',
                    'table' => $table
                ], 200);
            }
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function deleteTable($tableId) {
        try {
            // Tìm bản ghi theo ID và xoá nó
            $deletedTable = Table::find($tableId);
    
            if (!$deletedTable) {
                return response()->json([
                    'success' => false,
                    'error' => 'Table not found'
                ], 404);
            }
    
            $deletedTable->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Table deleted successfully',
                'table' => $deletedTable
            ], 201);
        } catch (Exception $error) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing the request.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}
