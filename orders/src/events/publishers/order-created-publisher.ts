import { Publisher, OrderCreatedEvent, Subjects } from '@lab2ubt/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
