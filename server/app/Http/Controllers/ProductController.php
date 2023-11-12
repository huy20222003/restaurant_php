<?php

namespace App\Http\Controllers;

use App\Models\ImageProduct;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        try {
            // Lấy tất cả sản phẩm kèm theo hình ảnh của mỗi sản phẩm
            $products = Product::with('imageProducts')->orderBy('created_at', 'desc')->get();

            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'products' => $products]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function createProduct(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'subDescription' => 'string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'priceSale' => 'numeric|nullable',
                'status' => 'required|string',
                'categoryId' => 'required|numeric',
                'size' => 'string',
                'color' => 'string',
                'quantity' => 'numeric|required',
                'image_products' => 'array|required',
                'rate' => 'numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            // Tạo sản phẩm với các thông tin khác
            $product = Product::create([
                'name' => $request->name,
                'subDescription' => $request->subDescription,
                'description' => $request->description,
                'price' => $request->price,
                'priceSale' => $request->priceSale,
                'categoryId' => $request->categoryId,
                'status' => $request->status,
                'size' => json_encode($request->size),
                'color' => json_encode($request->color),
                'quantity' => $request->quantity,
                'rate' => 0,
            ]);

            foreach ($request->image_products as $image) {

                $response = cloudinary()->upload($image, ['folder' => 'restaurant_php'])->getSecurePath();
                ImageProduct::create([
                    'productId' => $product->id,
                    'imageUrl' => $response,
                ]);
            }

            $product->save();

            return response()->json(['success' => true, 'message' => 'Product created successfully', 'product' => $product], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }


    public function getProduct(Product $product)
    {
        try {
            $productWithImages = Product::with('imageProducts')->find($product->id);

            if ($productWithImages) {
                return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'product' => $productWithImages]);
            } else {
                return response()->json(['success' => false, 'message' => 'Product not found'], 404);
            }
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }


    public function updateProduct(Request $request, Product $product)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'subDescription' => 'string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'priceSale' => 'numeric|nullable',
                'status' => 'required|string',
                'categoryId' => 'required|numeric',
                'size' => 'string',
                'color' => 'string',
                'quantity' => 'numeric|required',
                'image_products' => 'array|required',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            foreach ($request->image_products as $image) {

                $response = cloudinary()->upload($image, ['folder' => 'restaurant_php'])->getSecurePath();
                ImageProduct::create([
                    'productId' => $product->id,
                    'imageUrl' => $response,
                ]);
            }

            $product->name = $request->input('name');
            $product->subDescription = $request->input('subDescription');
            $product->description = $request->input('description');
            $product->price = $request->input('price');
            $product->priceSale = $request->input('priceSale');
            $product->categoryId = $request->input('categoryId');
            $product->size = json_encode($request->input('size'));
            $product->color = json_encode($request->input('color'));
            $product->quantity = $request->input('quantity');
            $product->save();

            return response()->json(['success' => true, 'message' => 'Product updated successfully', 'product' => $product]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function deleteProduct(Product $product)
    {
        try {
            // Delete records in ImageProduct where productId matches $product->id
            ImageProduct::where('productId', $product->id)->delete();

            // Delete the product record itself
            $product->delete();

            return response()->json(['success' => true, 'message' => 'Product and related images deleted successfully']);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }

    public function searchProduct(Request $request)
    {
        try {
            dd($request->q);
            $keyword = $request->input('q');

            $products = Product::where('name', 'like', '%' . $keyword . '%')->get();

            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'products' => $products]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'An error occurred while processing the request.', 'error' => $exception->getMessage()], 500);
        }
    }
}
