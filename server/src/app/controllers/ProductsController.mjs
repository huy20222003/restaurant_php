import Products from '../models/Products.mjs';

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const totalProducts = await Products.countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);

      const skip = (page - 1) * pageSize;
      const products = await Products.find({}).skip(skip).limit(pageSize);

      res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        products,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  async getSingleProduct(req, res) {
    try {
      const product = await Products.findById(req.params._id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Product found', product });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  async addProduct(req, res) {
    try {
      const { name, description, price, category, image_url } = req.body;

      if (!name || !price || !description || !category) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      let imageUrl = image_url; // Giả định imageUrl ban đầu là image_url

      if (Array.isArray(image_url)) {
        const uploadResults = await Promise.all(
          image_url.map(async (url) => {
            if (url.startsWith('data:')) {
              const uploadResult = await Products.uploadFileToCloudinary(url);
              if (!uploadResult.status) {
                return res
                  .status(500)
                  .json({
                    success: false,
                    message: 'Error uploading image_url',
                  });
              }
              return uploadResult.imageUrl;
            } else {
              return url;
            }
          })
        );

        imageUrl = uploadResults; // Lấy danh sách imageUrl từ Cloudinary hoặc sử dụng nguyên bản
      } else if (image_url.startsWith('data:')) {
        const uploadResult = await Products.uploadFileToCloudinary(image_url);
        if (!uploadResult.status) {
          return res
            .status(500)
            .json({ success: false, message: 'Error uploading image_url' });
        }
        imageUrl = [uploadResult.imageUrl]; // Lấy imageUrl từ Cloudinary nếu image_url là một chuỗi
      }

      const newProduct = new Products({
        name,
        description,
        category,
        price,
        image_url: imageUrl, // Sử dụng imageUrl đã cập nhật
      });
      await newProduct.save();

      res.status(201).json({
        success: true,
        message: 'Product added successfully!',
        product: newProduct,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  }

  async updateProduct(req, res) {
    try {
      const updateProduct = await Products.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!updateProduct) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }

      if (
        !updateProduct.name ||
        !updateProduct.price ||
        !updateProduct.category ||
        !updateProduct.image_url
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      res.status(201).json({
        success: true,
        message: 'Product updated successfully!',
        product: updateProduct,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params._id);
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }
      res.status(201).json({
        success: true,
        message: 'Product deleted successfully!',
        product: deletedProduct,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  }

  async searchProduct(req, res) {
    console.log(req.query);
  }
}

export default new ProductsController();
