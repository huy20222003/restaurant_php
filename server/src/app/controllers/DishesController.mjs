import Dishes from '../models/Dishes.mjs';

class DishesController {
  async getAllDishes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      const totalDishes = await Dishes.countDocuments();
      const totalPages = Math.ceil(totalDishes / pageSize);

      const skip = (page - 1) * pageSize;
      const dishes = await Dishes.find({}).skip(skip).limit(pageSize);

      res.status(200).json({
        success: true,
        message: 'Retrieve dish data successfully!',
        dishes,
        currentPage: page,
        totalPages: totalPages,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  async getSingleDish(req, res) {
    try {
      const dish = await Dishes.findById(req.params._id);
      if (!dish) {
        return res
          .status(404)
          .json({ success: false, message: 'Dish not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Dish found', dish });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  async addDish(req, res) {
    try {
      const { name, description, price, category, image_url } = req.body;

      if (!name || !price || !description || !category) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      let imageUrl = image_url; // Giả định imageUrl ban đầu là image_url

      if (image_url.startsWith('data:')) {
        const uploadResult = await Dishes.uploadFileToCloudinary(image_url);
        if (!uploadResult.status) {
          return res
            .status(500)
            .json({ success: false, message: 'Error uploading image_url' });
        }
        imageUrl = uploadResult.imageUrl; // Lấy imageUrl từ Cloudinary nếu image_url bắt đầu bằng 'data:'
      }

      const newDish = new Dishes({
        name,
        description,
        category,
        price,
        image_url: imageUrl, // Sử dụng imageUrl đã cập nhật
      });
      await newDish.save();

      res.status(201).json({
        success: true,
        message: 'Dish added successfully!',
        dish: newDish,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  }

  async updateDish(req, res) {
    try {
      const updatedDish = await Dishes.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!updatedDish) {
        return res
          .status(404)
          .json({ success: false, message: 'Dish not found' });
      }

      if (
        !updatedDish.name ||
        !updatedDish.price ||
        !updatedDish.category ||
        !updatedDish.image_url
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      res.status(201).json({
        success: true,
        message: 'Dish updated successfully!',
        updatedDish,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  }

  async deleteDish(req, res) {
    try {
      const deletedDish = await Dishes.findByIdAndDelete(req.params._id);
      if (!deletedDish) {
        return res
          .status(404)
          .json({ success: false, message: 'Dish not found' });
      }
      res.status(201).json({
        success: true,
        message: 'Dish deleted successfully!',
        deletedDish,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Bad request' });
    }
  }
}

export default new DishesController();
