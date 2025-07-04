import { PaymentMethod, PaymentStatus } from "../globals/types";
import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetails from "../database/models/orderDetails";
import Payment from "../database/models/paymentModel";
import axios from "axios";

interface IProduct {
  productId: string;
  productQty: string;
}

interface OrderRequest extends Request {
  user?: {
    id: string;
  };
}

class OrderController {
  // 🧾 Create Order
  public static async createOrder(req: OrderRequest, res: Response) {
    try {
      const userId = req.user?.id;

      const {
        phoneNumber,
        shippingAddress,
        totalAmount,
        paymentMethod,
        products,
      }: {
        phoneNumber: string;
        shippingAddress: string;
        totalAmount: number;
        paymentMethod: PaymentMethod;
        products: IProduct[];
      } = req.body;

      if (!phoneNumber || !shippingAddress || !totalAmount || !products.length) {
        return res.status(400).json({
          message: "Please provide phoneNumber, shippingAddress, totalAmount, and products",
        });
      }

      // 🛒 Step 1: Create Order
      const orderData = await Order.create({
        phoneNumber,
        shippingAddress,
        totalAmount,
        userId,
      });

      // 🧾 Step 2: Add Order Details
      for (const product of products) {
        await OrderDetails.create({
          productId: product.productId,
          quantity: product.productQty,
          orderId: orderData.id,
        });
      }

      // 💳 Step 3: Create Initial Payment Record
      const paymentData = await Payment.create({
        orderId: orderData.id,
        paymentMethod,
        paymentStatus: paymentMethod === PaymentMethod.khalti ? PaymentStatus.unpaid : PaymentStatus.paid,
      });

      // 🚀 Step 4: Khalti Integration
      if (paymentMethod === PaymentMethod.khalti) {
        const data = {
          return_url: "http://localhost:5173/",
          website_url: "http://localhost:5173/",
          amount: totalAmount * 100,
          purchase_order_id: orderData.id,
          purchase_order_name: `order_${orderData.id}`,
        };

        const response = await axios.post(
          "https://dev.khalti.com/api/v2/epayment/initiate/",
          data,
          {
            headers: {
              Authorization: "key fc83bf18e5f94f068b508c09a2ad5d33",
              "Content-Type": "application/json",
            },
          }
        );

        const { pidx, payment_url } = response.data;

        // Update payment record with pidx
        paymentData.pidx = pidx;
        await paymentData.save();

        return res.status(200).json({
          message: "Khalti payment initiated",
          paymentUrl: payment_url,
          pidx,
        });
      }

      // 🟡 Esewa Placeholder
      if (paymentMethod === PaymentMethod.esewa) {
        return res.status(200).json({
          message: "Esewa payment integration coming soon",
        });
      }

      // ✅ COD (Cash on Delivery)
      if (paymentMethod === PaymentMethod.COD) {
        return res.status(200).json({
          message: "Order created successfully with Cash on Delivery",
        });
      }

      return res.status(400).json({ message: "Invalid payment method selected" });

    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // 🔍 Verify Khalti Payment
  public static async verifyTransaction(req: OrderRequest, res: Response): Promise<Response> {
    try {
      const { pidx } = req.body;

      if (!pidx) {
        return res.status(400).json({ message: "Please provide pidx" });
      }

      const response = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/lookup/",
        { pidx },
        {
          headers: {
            Authorization: "key fc83bf18e5f94f068b508c09a2ad5d33",
          },
        }
      );

      const data = response.data;
      console.log("Khalti Lookup Response:", data);

      if (data.status === "Completed") {
        await Payment.update(
          { paymentStatus: PaymentStatus.paid },
          { where: { pidx } }
        );

        return res.status(200).json({ message: "Payment completed successfully" });
      } else {
        return res.status(200).json({ message: "Payment not completed yet" });
      }

    } catch (error) {
      console.error("Error verifying transaction:", error);
      return res.status(500).json({ message: "Error verifying transaction" });
    }
  }
}

export default OrderController;
