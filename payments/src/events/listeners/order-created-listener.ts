import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@lab2ubt/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
// import { OrderUpdatedPublisher } from '../publishers/order-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the order that the order is reserving
    const order = await Order.build({
        id: data.id,
        price: data.ticket.price,
        status: data.status,
        userId: data.userId,
        version: data.version,
    })


    // Save the order
    await order.save();
    // await new orderUpdatedPublisher(this.client).publish({
    //   id: order.id,
    //   price: order.price,
    //   title: order.title,
    //   userId: order.userId,
    //   orderId: order.orderId,
    //   version: order.version,
    // });

    // ack the message
    msg.ack();
  }
}
