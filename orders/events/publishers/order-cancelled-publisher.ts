import { Subjects, Publisher, OrderCancelledEvent } from '@lab2ubt/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
