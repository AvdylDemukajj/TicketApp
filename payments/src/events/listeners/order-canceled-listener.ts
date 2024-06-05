import { Listener, OrderCancelledEvent, Subjects, OrderStatus } from '@lab2ubt/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
// import { orderUpdatedPublisher } from '../publishers/order-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
        _id: data.id,
        version: data.version - 1
    });

    if (!order) {
      throw new Error('order not found');
    }

    order.set({
        status: OrderStatus.Cancelled
    });

    await order.save();
    // await new orderUpdatedPublisher(this.client).publish({
    //   id: order.id,
    //   orderId: order.orderId,
    //   userId: order.userId,
    //   price: order.price,
    //   title: order.title,
    //   version: order.version,
    // });

    msg.ack();
  }
}
