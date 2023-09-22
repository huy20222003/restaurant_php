import Orders from '../models/Orders.mjs';

class OrdersController {
  async getAllOrders(req, res) {
    try {
      const orders = await Orders.find({});
  
      return res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getAllOrdersById(req, res) {
    try {
      const orders = await Orders.find({userOrder: req.user._id});
  
      return res.status(200).json({
        success: true,
        message: 'Retrieve products data successfully!',
        orders,
      });
    } catch (error) {
      return res.status(500).json({
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
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async createOrder(req, res) {
    try {
      const {
        fullName,
        phoneNumber,
        shipAddress,
        items,
        totalPrices,
        status,
        shippingFee,
        shippingUnit,
        paymentMethod,
      } = req.body;
      if (
        !fullName ||
        !phoneNumber ||
        !shipAddress ||
        !items ||
        !totalPrices ||
        !status ||
        !shippingUnit ||
        !paymentMethod
      ) {
        return res
          .status(403)
          .json({ success: false, message: 'Require fields mising!' });
      } else {
        const newOrder = Orders({
          fullName,
          phoneNumber,
          shipAddress,
          items,
          totalPrices,
          status,
          shippingFee,
          shippingUnit,
          paymentMethod,
          userOrder: req.user._id,
        });
        await newOrder.save();

        return res.status(200).json({
          success: true,
          message: 'Create order successful!',
          order: newOrder,
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
  async filterOrderByStatus(req, res) {
    try {
      const { status } = req.query;
      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid status.' });
      } else {
        const orders = await Orders.find({ status: status });
        if (!orders) {
          return res
            .status(404)
            .json({ success: false, message: 'No matching order found.' });
        } else {
          return res.status(200).json({
            success: true,
            message: 'Found a suitable order.',
            orders,
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
}

export default new OrdersController();
