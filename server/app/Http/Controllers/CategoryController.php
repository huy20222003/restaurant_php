<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllCategory()
    {
        try {
            $categories = Category::orderBy('created_at', 'desc')->get();
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'categories' => $categories]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function getOneCategory(Category $category)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'category' => $category]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createCategory(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'description' => 'string',
                'imageUrl' => 'required|string', 
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            // Get the base64 image data from the request
            $base64Image = $request->imageUrl;

            $response = cloudinary()->upload($base64Image, ['folder' => 'restaurant_php'])->getSecurePath(); 
    
            // Create the category with the uploaded image URL
            $category = Category::create([
                'name' => $request->name,
                'description' => $request->description,
                'imageUrl' => $response,
            ]);

            return response()->json(['success' => true, 'message' => 'Category created successfully', 'category' => $category], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Category creation failed', 'error' => $exception->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function updateCategory(Request $request, Category $category)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:100',
                'description' => 'string|max:2000',
                'imageUrl' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $base64Image = $request->imageUrl;

            $response = cloudinary()->upload($base64Image, ['folder' => 'restaurant_php'])->getSecurePath(); 

            $category->name = $request->name;
            $category->description = $request->description;
            $category->imageUrl = $response;
            $category->save();

            return response()->json(['success' => true, 'message' => 'Category updated successfully', 'category' => $category]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteCategory(Category $category)
    {
        try {
            $category->delete();

            return response()->json(['success' => true, 'message' => 'Category deleted successfully', 'category' => $category]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function addProductToCategory(Request $request)
{
    try {
        $productId = $request->input('productId');
        $categoryId = $request->input('categoryId');

        // Tìm sản phẩm dựa trên ID và cập nhật trường `category`
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Product not found!'], 404);
        }

        $product->categoryId = $categoryId;
        $product->save();

        return response()->json(['success' => true, 'message' => 'Add product successful!'], 200);
    } catch (Exception $exception) {
        return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
    }
}

}
