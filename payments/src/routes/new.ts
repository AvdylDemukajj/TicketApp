import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { requireAuth,validateRequest, NotAuthorizedError,BadRequestError, NotFoundError, OrderStatus } from '@lab2ubt/common';
import { natsWrapper } from '../nats-wrapper';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payments';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';

 const router = express.Router();

 router.post('/api/payments',requireAuth,
 [
     body('orderId').not().isEmpty(),
     body('token').not().isEmpty()
 ],
 validateRequest,
 async (req: Request, res: Response) => {
     const { token, orderId} = req.body;
     const order = await Order.findById(orderId);
     if (!order) {
         throw new NotFoundError();
     }
     if (order.userId !== req.currentUser!.id) {
         throw new NotAuthorizedError();
     }
     if (order.status === OrderStatus.Cancelled) {
         throw new BadRequestError('Cannot pay for a cancelled order');
     }
     try {
         const charge = await stripe.paymentIntents.create({
            currency: 'usd',
             amount: order.price * 100,
            //  payment_method: token,
            //  confirm: true
            automatic_payment_methods: {
                enabled: true,
              },
         });
         const payment = Payment.build({
             orderId,
             stripeId: charge.id
         });
         await payment.save();
         new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
         });
         res.status(201).send({id: payment.id});
     } catch (err) {
        throw new BadRequestError('Invalid payment method token');
        console.log(err);
     }
 }  
 );

 export { router as createChargeRouter };


