import Categorys from '../models/Categorys.mjs';

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Categorys.find({});
      res
        .status(200)
        .json({
          success: true,
          message: 'Retrieve category data successfully!',
          categories,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addCategory(req, res) {
    try {
      const newCategory = new Categorys(req.body);

      if (!newCategory.name) {
        return res
          .status(400)
          .json({ success: false, error: 'Category name is required' });
      }

      const savedCategory = await newCategory.save();
      res
        .status(201)
        .json({
          success: true,
          message: 'Category added successfully!',
          category: savedCategory,
        });
    } catch (error) {
      res.status(500).json({
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
      }

      res
        .status(201)
        .json({
          success: true,
          message: 'Category updated successfully!',
          updatedCategory,
        });
    } catch (error) {
      res.status(500).json({
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
      res
        .status(201)
        .json({
          success: true,
          message: 'Category deleted successfully!',
          deletedCategory,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new CategoryController();
