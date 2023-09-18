import Orders from '../models/Orders.mjs';

class OrdersController {
  async getAllOrders(req, res) {
    try {
      const orders = await Orders.find({});

      res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getAllOrdersById(req, res) {
    try {
      const orders = await Orders.find({userOrder: req.user._id});

      res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleOrder(req, res) {
    try {
      const order = await Orders.findById(req.params._id);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: 'Order not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Order found', order });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

 
}

export default new OrdersController();
