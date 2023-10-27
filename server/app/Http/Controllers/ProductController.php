<?php

namespace App\Http\Controllers;

use App\Models\ImageProduct;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        try {
            // Lấy tất cả sản phẩm kèm theo hình ảnh của mỗi sản phẩm
            $products = Product::with('imageProducts')->get();

            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'products' => $products]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed!', 'error' => $exception], 500);
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
                'priceSale' => 'numeric',
                'status' => 'required|string',
                'categoryId' => 'required|numeric',
                'size' => 'string',
                'color' => 'string',
                'quantity' => 'numeric|required',
                'imageUrl' => 'array|required',
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
                'size' => $request->size,
                'color' => $request->color,
                'quantity' => $request->quantity,
                'rate' => $request->rate,
            ]);

            // Lặp qua mảng hình ảnh và tải lên chúng lên Cloudinary
            $imageUrls = [];

            foreach ($request->imageUrl as $image) {
                $uploadedImage = Cloudinary::upload($image->getRealPath());

                // Lấy URL của hình ảnh đã tải lên
                $imageUrl = $uploadedImage->getSecurePath();

                // Tạo một bản ghi trong bảng ImageProduct cho mỗi hình ảnh và liên kết với sản phẩm
                ImageProduct::create([
                    'productId' => $product->id,
                    'imageUrl' => $imageUrl,
                ]);

                // Thêm URL vào mảng
                $imageUrls[] = $imageUrl;
            }

            // Cập nhật trường imageUrl trong sản phẩm với danh sách URL
            $product->imageUrl = $imageUrls;
            $product->save();

            return response()->json(['success' => true, 'message' => 'Product created successfully', 'product' => $product], 201);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Product creation failed', 'error' => $exception], 500);
        }
    }


    public function getProduct(Product $product)
    {
        try {
            return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'product' => $product]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
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
                'priceSale' => 'numeric',
                'status' => 'required|string',
                'categoryId' => 'required|numeric',
                'size' => 'string',
                'color' => 'string',
                'quantity' => 'numeric|required',
                'imageUrl' => 'string|required',

            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'message' => $validator->errors()], 400);
            }

            $product->name = $request->input('name');
            $product->subDescription = $request->input('subDescription');
            $product->description = $request->input('description');
            $product->price = $request->input('price');
            $product->priceSale = $request->input('priceSale');
            $product->categoryId = $request->input('categoryId');
            $product->size = $request->input('size');
            $product->color = $request->input('color');
            $product->quantity = $request->input('quantity');
            $product->imageUrl = $request->input('imageUrl');
            $product->save();

            return response()->json(['success' => true, 'message' => 'Product updated successfully', 'product' => $product]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }

    public function deleteProduct(Product $product)
    {
        try {
            $product->delete();

            return response()->json(['success' => true, 'message' => 'Product deleted successfully', 'product' => $product]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }

    public function searchProduct(Request $request)
    {
        try {
            //$keyword = $request->input('à');

            //$products = Product::where('name', 'like', '%' . $keyword . '%')->get();
            dd($request);

            //return response()->json(['success' => true, 'message' => 'Retrieve data successfully', 'products' => $products]);
        } catch (Exception $exception) {
            return response()->json(['success' => false, 'message' => 'Retrieve data failed', 'error' => $exception], 500);
        }
    }
}
