import Cart from '../models/Carts.mjs';

class CartController {
    async getUserCart(req, res) {
        try {
            const userId = req._id; 
            const userCart = await Cart.findOne({ userCart: userId }).populate('userCart');
            
            if (!userCart) {
                return res.status(404).json({ success: false, error: 'Cart not found' });
            }

            res.status(200).json({ success: true, message: 'Retrieve cart data successfully!', data: userCart });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    async updateCart(req, res) {
        try {
            const userId = req._id; 
            const cartData = req.body;

            const updatedCart = await Cart.findOneAndUpdate({ userCart: userId }, cartData, { new: true });

            if (!updatedCart) {
                return res.status(404).json({ success: false, error: 'Cart not found' });
            }

            res.json({ success: true, message: 'Cart updated successfully!', data: updatedCart });
        } catch (error) {
            res.status(400).json({ success: false, error: 'Bad request' });
        }
    }

    async deleteCart(req, res) {
        try {
            const userId = req.params.userId; // Assuming you are passing the user's ID as a parameter
            const deletedCart = await Cart.findOneAndDelete({ userCart: userId });

            if (!deletedCart) {
                return res.status(404).json({ success: false, error: 'Cart not found' });
            }

            res.json({ success: true, message: 'Cart deleted successfully!', data: deletedCart });
        } catch (error) {
            res.status(400).json({ success: false, error: 'Bad request' });
        }
    }
}

export default new CartController();
