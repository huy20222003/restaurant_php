import Categorys from '../models/Categorys.mjs';
import Products from '../models/Products.mjs';

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Categorys.find({});
      return res.status(200).json({
        success: true,
        message: 'Retrieve category data successfully!',
        categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleCategory(req, res) {
    try {
      const category = await Categorys.findById(req.params._id);
      return res.status(200).json({
        success: true,
        message: 'Retrieve category data successfully!',
        category: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addCategory(req, res) {
    try {
      const { name, description, imageUrl } = req.body;
      if (!name || !imageUrl) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      } else {
        const uploadResult = await Categorys.uploadFileToCloudinary(imageUrl);
        if (!uploadResult.status) {
          return res
            .status(500)
            .json({ success: false, message: 'Error uploading imageUrl' });
        } else {
          const newCategory = new Categorys({
            name,
            description,
            imageUrl: uploadResult.imageUrl,
          });
          await newCategory.save();
          return res.status(201).json({
            success: true,
            message: 'Category added successfully!',
            category: newCategory,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const updatedCategory = await Categorys.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return res
          .status(404)
          .json({ success: false, error: 'Category not found' });
      }

      if (!updatedCategory.name) {
        return res
          .status(400)
          .json({ success: false, error: 'Category name is required' });
      } else {
        return res.status(201).json({
          success: true,
          message: 'Category updated successfully!',
          category: updatedCategory,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await Categorys.findByIdAndDelete(req.params._id);
      if (!deletedCategory) {
        return res
          .status(404)
          .json({ success: false, error: 'Category not found' });
      }
      return res.status(201).json({
        success: true,
        message: 'Category deleted successfully!',
        deletedCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addProductToCategory(req, res) {
    try {
      const { productId, categoryId } = req.body;
      const product = await Products.findByIdAndUpdate(productId, {
        category: categoryId,
      });
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found!' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Add product successfull!' });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new CategoryController();
