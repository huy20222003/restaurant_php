import Dishes from '../models/Dishes.mjs';

class DishesController {
    async getAllDishes(req, res) {
        try {
            const dishes = await Dishes.find({});
            res.status(200).json({ success: true, message: 'Retrieve dish data successfully!', data: dishes });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    async addDish(req, res) {
        try {
            const newDish = new Dishes(req.body);

            if (!newDish.name || !newDish.price || !newDish.category || !newDish.image_url) {
                return res.status(400).json({ success: false, error: 'Required fields missing' });
            }

            const savedDish = await newDish.save();
            res.status(201).json({ success: true, message: 'Dish added successfully!', data: savedDish });
        } catch (error) {
            res.status(400).json({ success: false, error: 'Bad request' });
        }
    }

    async updateDish(req, res) {
        try {
            const updatedDish = await Dishes.findByIdAndUpdate(req.params._id, req.body, { new: true });
            if (!updatedDish) {
                return res.status(404).json({ success: false, error: 'Dish not found' });
            }

            if (!updatedDish.name || !updatedDish.price || !updatedDish.category || !updatedDish.image_url) {
                return res.status(400).json({ success: false, error: 'Required fields missing' });
            }

            res.status(201).json({ success: true, message: 'Dish updated successfully!', data: updatedDish });
        } catch (error) {
            res.status(400).json({ success: false, error: 'Bad request' });
        }
    }

    async deleteDish(req, res) {
        try {
            const deletedDish = await Dishes.findByIdAndDelete(req.params._id);
            if (!deletedDish) {
                return res.status(404).json({ success: false, error: 'Dish not found' });
            }
            res.status(201).json({ success: true, message: 'Dish deleted successfully!', data: deletedDish });
        } catch (error) {
            res.status(400).json({ success: false, error: 'Bad request' });
        }
    }
}

export default new DishesController();
